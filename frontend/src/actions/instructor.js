import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

const enableServer = true;

const INSTRUCTORS_ENDPOINT = endpoints.instructors || '/api/instructors';
const DEPARTMENTS_ENDPOINT = `${INSTRUCTORS_ENDPOINT}/departments`;
const RANKINGS_ENDPOINT = `${INSTRUCTORS_ENDPOINT}/rankings`;

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------

export function useGetInstructors() {
  const { data, isLoading, error, isValidating } = useSWR(INSTRUCTORS_ENDPOINT, fetcher, {
    ...swrOptions,
  });

  const memoizedValue = useMemo(() => ({
    instructors: data?.data || [],
    instructorsLoading: isLoading,
    instructorsError: error,
    instructorsValidating: isValidating,
    instructorsEmpty: !isLoading && !isValidating && !data?.data?.length,
  }), [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetInstructor(instructorId) {
  const { data, isLoading, error, isValidating } = useSWR(
    instructorId ? `${INSTRUCTORS_ENDPOINT}/${instructorId}` : null,
    fetcher,
    {
      ...swrOptions,
    }
  );

  const memoizedValue = useMemo(() => ({
    instructor: data?.data || null,
    instructorLoading: isLoading,
    instructorError: error,
    instructorValidating: isValidating,
  }), [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetDepartments() {
  const { data, isLoading, error, isValidating } = useSWR(DEPARTMENTS_ENDPOINT, fetcher, {
    ...swrOptions,
  });

  const memoizedValue = useMemo(() => ({
    departments: data?.data || [],
    departmentsLoading: isLoading,
    departmentsError: error,
    departmentsValidating: isValidating,
    departmentsEmpty: !isLoading && !isValidating && !data?.data?.length,
  }), [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetRankings() {
  const { data, isLoading, error, isValidating } = useSWR(RANKINGS_ENDPOINT, fetcher, {
    ...swrOptions,
  });

  const memoizedValue = useMemo(() => ({
    rankings: data?.data || [],
    rankingsLoading: isLoading,
    rankingsError: error,
    rankingsValidating: isValidating,
    rankingsEmpty: !isLoading && !isValidating && !data?.data?.length,
  }), [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createInstructor(instructorData) {
  /**
   * Work on server
   */
  if (enableServer) {
    const formData = new FormData();
    
    // Add all fields to FormData
    Object.keys(instructorData).forEach(key => {
      if (instructorData[key] !== null && instructorData[key] !== undefined) {
        if (key === 'avatar' && instructorData[key] instanceof File) {
          formData.append(key, instructorData[key]);
        } else if (key !== 'avatar') {
          formData.append(key, instructorData[key]);
        }
      }
    });

    const response = await axios.post(INSTRUCTORS_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Mutate the instructors list to include the new instructor
    mutate(INSTRUCTORS_ENDPOINT);
    
    return response.data;
  }
}

// ----------------------------------------------------------------------

export async function updateInstructor(instructorId, instructorData) {
  /**
   * Work on server
   */
  if (enableServer) {
    const formData = new FormData();
    
    // Add all fields to FormData
    Object.keys(instructorData).forEach(key => {
      if (instructorData[key] !== null && instructorData[key] !== undefined) {
        if (key === 'avatar' && instructorData[key] instanceof File) {
          formData.append(key, instructorData[key]);
        } else if (key !== 'avatar') {
          formData.append(key, instructorData[key]);
        }
      }
    });

    const response = await axios.put(`${INSTRUCTORS_ENDPOINT}/${instructorId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Mutate both the instructors list and the specific instructor
    mutate(INSTRUCTORS_ENDPOINT);
    mutate(`${INSTRUCTORS_ENDPOINT}/${instructorId}`);
    
    return response.data;
  }
}

// ----------------------------------------------------------------------

export async function updateInstructorCredentials(instructorId, credentialsData) {
  /**
   * Work on server
   */
  if (enableServer) {
    const response = await axios.put(`${INSTRUCTORS_ENDPOINT}/${instructorId}/admin/credentials`, credentialsData);
    
    // Mutate the instructors list to reflect the update
    mutate(INSTRUCTORS_ENDPOINT);
    
    return response.data;
  }
}

// ----------------------------------------------------------------------

export async function deleteInstructor(instructorId) {
  try {
    /**
     * Work on server
     */
    if (enableServer) {
      const response = await axios.delete(`${INSTRUCTORS_ENDPOINT}/${instructorId}`);
      
      // Mutate both the instructors list and the specific instructor cache
      mutate(INSTRUCTORS_ENDPOINT);
      mutate(`${INSTRUCTORS_ENDPOINT}/${instructorId}`);
      
      return response.data;
    }

    /**
     * Work in local - remove from cache
     */
    mutate(
      INSTRUCTORS_ENDPOINT,
      (currentData) => {
        const currentInstructors = currentData?.data;
        const instructors = currentInstructors.filter((instructor) => instructor.id !== instructorId);
        return { ...currentData, data: instructors };
      },
      false
    );
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting instructor:', error);
    throw error;
  }
} 