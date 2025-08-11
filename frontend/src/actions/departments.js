import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import axios, { endpoints, fetcher } from 'src/lib/axios';

const enableServer = false; // Use mock data for now

const DEPARTMENTS_ENDPOINT = endpoints.department.list;

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

export function useGetDepartments() {
  const { data, error, isLoading, isValidating } = useSWR(DEPARTMENTS_ENDPOINT, fetcher, swrOptions);
  const memoizedValue = useMemo(
    () => ({
      departments: data?.data || data || null,
      departmentsLoading: isLoading,
      departmentsError: error,
      departmentsValidating: isValidating,
    }),
    [data?.data, data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetDepartment(departmentId) {
  const { data, error, isLoading } = useSWR(DEPARTMENTS_ENDPOINT, fetcher, swrOptions);
  return { department: data, departmentLoading: isLoading, departmentError: error };
}

export function useGetDepartmentsByFaculty(facultyId) {
  const { data, error, isLoading } = useSWR(DEPARTMENTS_ENDPOINT, fetcher, swrOptions);
  return { departments: data, departmentsLoading: isLoading, departmentsError: error };
}
