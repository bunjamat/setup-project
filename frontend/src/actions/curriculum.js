import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/lib/axios';
import { _curriculums, _faculties, _majors } from 'src/_mock';

// ----------------------------------------------------------------------

const enableServer = true; // Use mock data for now

const CURRICULUMS_ENDPOINT = endpoints.curriculum?.list || '/api/curriculums';

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------

export function useGetCurriculums(params = {}) {
  const { page = 1, limit = 10, search, status, facultyId, majorId } = params;

  // Build query string
  const queryParams = new URLSearchParams();
  queryParams.set('page', page.toString());
  queryParams.set('limit', limit.toString());
  if (search) queryParams.set('search', search);
  if (status && status !== 'all') queryParams.set('status', status);
  if (facultyId && facultyId !== 'all') queryParams.set('facultyId', facultyId);
  if (majorId && majorId !== 'all') queryParams.set('majorId', majorId);

  const url = `${CURRICULUMS_ENDPOINT}?${queryParams.toString()}`;

  const { data, isLoading, error, isValidating } = useSWR(
    url,
    enableServer ? fetcher : () => Promise.resolve(getMockCurriculums(params)),
    {
      ...swrOptions,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      curriculums: data?.data || [],
      curriculumsLoading: isLoading,
      curriculumsError: error,
      curriculumsValidating: isValidating,
      curriculumsEmpty: !isLoading && !isValidating && !data?.data?.length,
      pagination: data?.pagination || null,
      totalCount: data?.pagination?.total || data?.total || 0,
    }),
    [data?.data, data?.pagination, data?.total, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetCurriculum(curriculumId) {
  const { data, isLoading, error, isValidating } = useSWR(
    curriculumId ? `${CURRICULUMS_ENDPOINT}/${curriculumId}` : null,
    enableServer ? fetcher : () => Promise.resolve(getMockCurriculum(curriculumId)),
    {
      ...swrOptions,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      curriculum: data?.data || data || null,
      curriculumLoading: isLoading,
      curriculumError: error,
      curriculumValidating: isValidating,
    }),
    [data?.data, data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createCurriculum(curriculumData, options = {}) {
  try {
    if (enableServer) {
      const form = new FormData();

      // append primitives
      const entries = Object.entries(curriculumData || {});
      for (const [key, value] of entries) {
        if (value === undefined || value === null || key === 'coverImageFile') continue;
        form.append(key, value);
      }

      // handle file
      if (curriculumData?.coverImageFile) {
        form.append('coverImageFile', curriculumData.coverImageFile);
      }

      const response = await axios.post(CURRICULUMS_ENDPOINT, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        ...options,
      });

      // Mutate the curriculums list to include the new curriculum
      mutate(CURRICULUMS_ENDPOINT);

      return response.data;
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating curriculum:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export async function updateCurriculum(curriculumId, curriculumData, options = {}) {
  try {
    if (enableServer) {
      const form = new FormData();
      const entries = Object.entries(curriculumData || {});
      for (const [key, value] of entries) {
        if (value === undefined || value === null || key === 'coverImageFile') continue;
        form.append(key, value);
      }
      if (curriculumData?.coverImageFile) {
        form.append('coverImageFile', curriculumData.coverImageFile);
      }

      const response = await axios.put(`${CURRICULUMS_ENDPOINT}/${curriculumId}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        ...options,
      });

      // Mutate both the curriculums list and the specific curriculum
      mutate(CURRICULUMS_ENDPOINT);
      mutate(`${CURRICULUMS_ENDPOINT}/${curriculumId}`);

      return response.data;
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating curriculum:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export async function deleteCurriculum(curriculumId) {
  try {
    /**
     * Work on server
     */
    if (enableServer) {
      const response = await axios.delete(`${CURRICULUMS_ENDPOINT}/${curriculumId}`);

      // Mutate both the curriculums list and the specific curriculum cache
      mutate(CURRICULUMS_ENDPOINT);
      mutate(`${CURRICULUMS_ENDPOINT}/${curriculumId}`);

      return response.data;
    }

    /**
     * Work in local - remove from cache
     */
    mutate(
      CURRICULUMS_ENDPOINT,
      (currentData) => {
        const currentCurriculums = currentData?.data;
        const curriculums = currentCurriculums.filter(
          (curriculum) => curriculum.id !== curriculumId
        );
        return { ...currentData, data: curriculums };
      },
      false
    );

    return { success: true };
  } catch (error) {
    console.error('Error deleting curriculum:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Mock data functions (used when enableServer is false)

function getMockCurriculums(params = {}) {
  const { page = 1, limit = 10, search, status, facultyId, majorId } = params;

  let filteredData = [..._curriculums];

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredData = filteredData.filter(
      (curriculum) =>
        curriculum.name.toLowerCase().includes(searchLower) ||
        curriculum.nameEn.toLowerCase().includes(searchLower) ||
        curriculum.code.toLowerCase().includes(searchLower) ||
        curriculum.major.name.toLowerCase().includes(searchLower) ||
        curriculum.faculty.name.toLowerCase().includes(searchLower)
    );
  }

  // Apply status filter
  if (status && status !== 'all') {
    filteredData = filteredData.filter((curriculum) => curriculum.status === status);
  }

  // Apply faculty filter
  if (facultyId && facultyId !== 'all') {
    filteredData = filteredData.filter((curriculum) => curriculum.facultyId === facultyId);
  }

  // Apply major filter
  if (majorId && majorId !== 'all') {
    filteredData = filteredData.filter((curriculum) => curriculum.majorId === majorId);
  }

  // Calculate pagination
  const total = filteredData.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
    total, // for backward compatibility
  };
}

function getMockCurriculum(curriculumId) {
  const curriculum = _curriculums.find((item) => item.id === curriculumId);
  return curriculum || null;
}

// ----------------------------------------------------------------------
// Additional hooks for faculties and majors

export function useGetFaculties() {
  const { data, isLoading, error, isValidating } = useSWR('/api/faculties', fetcher, {
    ...swrOptions,
  });

  const memoizedValue = useMemo(
    () => ({
      faculties: data?.data || [],
      facultiesLoading: isLoading,
      facultiesError: error,
      facultiesValidating: isValidating,
      facultiesEmpty: !isLoading && !isValidating && !data?.data?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
