import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/lib/axios';
import { _majors } from 'src/_mock';

// ----------------------------------------------------------------------

const enableServer = false; // Use mock data for now

const MAJORS_ENDPOINT = endpoints.major.list;

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------

export function useGetMajors(params = {}) {
  const { page = 1, limit = 10, search, facultyId, programId, departmentId } = params;
  
  // Build query string
  const queryParams = new URLSearchParams();
  queryParams.set('page', page.toString());
  queryParams.set('limit', limit.toString());
  if (search) queryParams.set('search', search);
  if (facultyId && facultyId !== 'all') queryParams.set('facultyId', facultyId);
  if (programId && programId !== 'all') queryParams.set('programId', programId);
  if (departmentId && departmentId !== 'all') queryParams.set('departmentId', departmentId);

  const url = `${MAJORS_ENDPOINT}?${queryParams.toString()}`;

  const { data, isLoading, error, isValidating } = useSWR(url, 
    fetcher, 
    {
      ...swrOptions,
    }
  );

  const memoizedValue = useMemo(() => ({
    majors: data?.data || [],
    majorsLoading: isLoading,
    majorsError: error,
    majorsValidating: isValidating,
    majorsEmpty: !isLoading && !isValidating && !data?.data?.length,
    pagination: data?.pagination || null,
    totalCount: data?.pagination?.total || data?.total || 0,
  }), [data?.data, data?.pagination, data?.total, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMajor(majorId) {
  const { data, isLoading, error, isValidating } = useSWR(
    majorId ? `${MAJORS_ENDPOINT}/${majorId}` : null,
    enableServer ? fetcher : () => Promise.resolve(getMockMajor(majorId)),
    {
      ...swrOptions,
    }
  );

  const memoizedValue = useMemo(() => ({
    major: data?.data || data || null,
    majorLoading: isLoading,
    majorError: error,
    majorValidating: isValidating,
  }), [data?.data, data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMajorsByProgram(programId = null) {
  const { data, isLoading, error, isValidating } = useSWR(
    programId ? `${MAJORS_ENDPOINT}/by-program/${programId}` : null,
    enableServer ? fetcher : () => {
      const filteredMajors = programId 
        ? _majors.filter(major => major.programId === programId)
        : [];
      return Promise.resolve({ data: filteredMajors });
    },
    { ...swrOptions }
  );

  const memoizedValue = useMemo(() => ({
    majors: data?.data || [],
    majorsLoading: isLoading,
    majorsError: error,
    majorsValidating: isValidating,
    majorsEmpty: !isLoading && !isValidating && !data?.data?.length,
  }), [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMajorsByDepartment(departmentId = null) {
  const { data, isLoading, error, isValidating } = useSWR(
    departmentId ? `${MAJORS_ENDPOINT}/by-department/${departmentId}` : null,
    enableServer ? fetcher : () => {
      const filteredMajors = departmentId 
        ? _majors.filter(major => major.departmentId === departmentId)
        : [];
      return Promise.resolve({ data: filteredMajors });
    },
    { ...swrOptions }
  );

  const memoizedValue = useMemo(() => ({
    majors: data?.data || [],
    majorsLoading: isLoading,
    majorsError: error,
    majorsValidating: isValidating,
    majorsEmpty: !isLoading && !isValidating && !data?.data?.length,
  }), [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createMajor(majorData) {
  try {
    if (enableServer) {
      const response = await axios.post(MAJORS_ENDPOINT, majorData);
      mutate(MAJORS_ENDPOINT);
      return response.data;
    }
    return { success: true };
  } catch (error) {
    console.error('Error creating major:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export async function updateMajor(majorId, majorData) {
  try {
    if (enableServer) {
      const response = await axios.put(`${MAJORS_ENDPOINT}/${majorId}`, majorData);
      mutate(MAJORS_ENDPOINT);
      mutate(`${MAJORS_ENDPOINT}/${majorId}`);
      return response.data;
    }
    return { success: true };
  } catch (error) {
    console.error('Error updating major:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export async function deleteMajor(majorId) {
  try {
    if (enableServer) {
      const response = await axios.delete(`${MAJORS_ENDPOINT}/${majorId}`);
      mutate(MAJORS_ENDPOINT);
      mutate(`${MAJORS_ENDPOINT}/${majorId}`);
      return response.data;
    }
    
    mutate(
      MAJORS_ENDPOINT,
      (currentData) => {
        const currentMajors = currentData?.data;
        const majors = currentMajors.filter((major) => major.id !== majorId);
        return { ...currentData, data: majors };
      },
      false
    );
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting major:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
// Mock data functions (used when enableServer is false)

function getMockMajors(params = {}) {
  const { page = 1, limit = 10, search, facultyId, programId, departmentId } = params;
  
  let filteredData = [..._majors];
  
  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredData = filteredData.filter(major =>
      major.name.toLowerCase().includes(searchLower) ||
      major.nameEn?.toLowerCase().includes(searchLower) ||
      major.code?.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply faculty filter
  if (facultyId && facultyId !== 'all') {
    filteredData = filteredData.filter(major => major.facultyId === facultyId);
  }
  
  // Apply program filter
  if (programId && programId !== 'all') {
    filteredData = filteredData.filter(major => major.programId === programId);
  }
  
  // Apply department filter
  if (departmentId && departmentId !== 'all') {
    filteredData = filteredData.filter(major => major.departmentId === departmentId);
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

function getMockMajor(majorId) {
  const major = _majors.find(item => item.id === majorId);
  return major || null;
}
