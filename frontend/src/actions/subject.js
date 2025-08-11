import axios from 'axios';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { CONFIG } from 'src/global-config';
import { fetcher, endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

const API_URL = CONFIG.serverUrl || 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ----------------------------------------------------------------------

const enableServer = true;

const SUBJECTS_ENDPOINT = endpoints.subjects || '/api/subjects';

const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

// ----------------------------------------------------------------------

export function useGetSubjects(params = {}) {
  const { page = 1, limit = 10, search, status } = params;
  
  // Build query string
  const queryParams = new URLSearchParams();
  queryParams.set('page', page.toString());
  queryParams.set('limit', limit.toString());
  if (search) queryParams.set('search', search);
  if (status && status !== 'all') queryParams.set('status', status);

  const url = `${SUBJECTS_ENDPOINT}?${queryParams.toString()}`;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
  });

  const memoizedValue = useMemo(() => ({
    subjects: data?.data || [],
    subjectsLoading: isLoading,
    subjectsError: error,
    subjectsValidating: isValidating,
    subjectsEmpty: !isLoading && !isValidating && !data?.data?.length,
    pagination: data?.pagination || null,
    totalCount: data?.pagination?.total || 0,
  }), [data?.data, data?.pagination, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetSubject(subjectId) {
  const { data, isLoading, error, isValidating } = useSWR(
    subjectId ? `${SUBJECTS_ENDPOINT}/${subjectId}` : null,
    fetcher,
    {
      ...swrOptions,
    }
  );

  const memoizedValue = useMemo(() => ({
    subject: data?.data || null,
    subjectLoading: isLoading,
    subjectError: error,
    subjectValidating: isValidating,
  }), [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function activateSubject(subjectId) {
  try {
    if (enableServer) {
      const response = await axiosInstance.post(`/api/subjects/${subjectId}/activate`);
      
      // Mutate SWR cache to reflect the change
      mutate(SUBJECTS_ENDPOINT);
      mutate(`${SUBJECTS_ENDPOINT}/${subjectId}`);
      
      return response.data;
    }
  } catch (error) {
    console.error('Error activating subject:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export async function deactivateSubject(subjectId) {
  try {
    if (enableServer) {
      const response = await axiosInstance.post(`/api/subjects/${subjectId}/deactivate`);
      
      // Mutate SWR cache to reflect the change
      mutate(SUBJECTS_ENDPOINT);
      mutate(`${SUBJECTS_ENDPOINT}/${subjectId}`);
      
      return response.data;
    }
  } catch (error) {
    console.error('Error deactivating subject:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export async function deleteSubject(subjectId) {
  try {
    if (enableServer) {
      const response = await axiosInstance.delete(`/api/subjects/${subjectId}`);
      
      // Mutate both the subjects list and the specific subject cache
      mutate(SUBJECTS_ENDPOINT);
      mutate(`${SUBJECTS_ENDPOINT}/${subjectId}`);
      
      return response.data;
    }

    // Work in local - remove from cache
    mutate(
      SUBJECTS_ENDPOINT,
      (currentData) => {
        const currentSubjects = currentData?.data;
        const subjects = currentSubjects.filter((subject) => subject.id !== subjectId);
        return { ...currentData, data: subjects };
      },
      false
    );
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting subject:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export const subjectApi = {
  // Get all subjects with pagination and filters
  getSubjects: async (params = {}) => {
    const response = await axiosInstance.get('/api/subjects', { params });
    return response.data;
  },

  // Get subject by ID
  getSubjectById: async (id) => {
    const response = await axiosInstance.get(`/api/subjects/${id}`);
    return response.data;
  },

  // Get subject by code
  getSubjectByCode: async (code) => {
    const response = await axiosInstance.get(`/api/subjects/code/${code}`);
    return response.data;
  },

  // Create new subject
  createSubject: async (data) => {
    const formData = new FormData();
    
    // Add all form fields to FormData
    Object.keys(data).forEach((key) => {
      if (key === 'coverImage' && data[key]) {
        formData.append(key, data[key]);
      } else if (Array.isArray(data[key])) {
        formData.append(key, JSON.stringify(data[key]));
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key].toString());
      }
    });

    const response = await axiosInstance.post('/api/subjects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update subject
  updateSubject: async (id, data) => {
    const formData = new FormData();
    
    // Add all form fields to FormData
    Object.keys(data).forEach((key) => {
      if (key === 'coverImage' && data[key]) {
        formData.append(key, data[key]);
      } else if (Array.isArray(data[key])) {
        formData.append(key, JSON.stringify(data[key]));
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key].toString());
      }
    });

    const response = await axiosInstance.put(`/api/subjects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete subject
  deleteSubject: async (id) => {
    const response = await axiosInstance.delete(`/api/subjects/${id}`);
    return response.data;
  },

  // Activate subject
  activateSubject: async (id) => {
    const response = await axiosInstance.post(`/api/subjects/${id}/activate`);
    return response.data;
  },

  // Deactivate subject
  deactivateSubject: async (id) => {
    const response = await axiosInstance.post(`/api/subjects/${id}/deactivate`);
    return response.data;
  },

  // Archive subject
  archiveSubject: async (id) => {
    const response = await axiosInstance.post(`/api/subjects/${id}/archive`);
    return response.data;
  },

  // Search subjects
  searchSubjects: async (params = {}) => {
    const response = await axiosInstance.get('/api/subjects/search', { params });
    return response.data;
  },

  // Get academic hierarchy
  getAcademicHierarchy: async () => {
    const response = await axiosInstance.get('/api/subjects/hierarchy');
    return response.data;
  },

  // Get subjects by curriculum
  getSubjectsByCurriculum: async (curriculumId) => {
    const response = await axiosInstance.get(`/api/subjects/by-curriculum/${curriculumId}`);
    return response.data;
  },

  // Get subjects by major
  getSubjectsByMajor: async (majorId) => {
    const response = await axiosInstance.get(`/api/subjects/by-major/${majorId}`);
    return response.data;
  },

  // Get subjects by program
  getSubjectsByProgram: async (programId) => {
    const response = await axiosInstance.get(`/api/subjects/by-program/${programId}`);
    return response.data;
  },

  // Get public subjects
  getPublicSubjects: async () => {
    const response = await axiosInstance.get('/api/subjects/public');
    return response.data;
  },

  // Get free subjects
  getFreeSubjects: async () => {
    const response = await axiosInstance.get('/api/subjects/free');
    return response.data;
  },

  // Get subjects by difficulty
  getSubjectsByDifficulty: async (difficulty) => {
    const response = await axiosInstance.get(`/api/subjects/difficulty/${difficulty}`);
    return response.data;
  },

  // Get subjects by type
  getSubjectsByType: async (type) => {
    const response = await axiosInstance.get(`/api/subjects/type/${type}`);
    return response.data;
  },
};

// ----------------------------------------------------------------------

// Helper functions for data transformation
export const transformSubjectData = (subject) => ({
  id: subject.id,
  code: subject.code,
  title: subject.title,
  titleEn: subject.titleEn,
  description: subject.description,
  majorId: subject.major?.id,
  curriculumIds: subject.curriculums?.map(c => c.id) || [],
  credits: subject.credits,
  theoryHours: subject.theoryHours,
  practiceHours: subject.practiceHours,
  selfStudyHours: subject.selfStudyHours,
  level: subject.level,
  subjectType: subject.subjectType,
  accessLevel: subject.accessLevel,
  difficulty: subject.difficulty,
  isFree: subject.isFree,
  price: subject.price,
  learningObjectives: subject.learningObjectives || [],
  skillsAcquired: subject.skillsAcquired || [],
  prerequisites: subject.prerequisites,
  targetAudience: subject.targetAudience,
  coverImage: subject.coverImage,
  introVideo: subject.introVideo,
  allowAllLessons: subject.allowAllLessons,
  status: subject.status,
  isActive: subject.isActive,
  enrollmentCount: subject.enrollmentCount || 0,
  major: subject.major,
  curriculums: subject.curriculums || [],
  instructors: subject.instructors || [],
  createdAt: subject.createdAt,
  updatedAt: subject.updatedAt,
});

export const getSubjectStatusColor = (status) => {
  switch (status) {
    case 'ACTIVE':
      return 'success';
    case 'INACTIVE':
      return 'warning';
    case 'DRAFT':
      return 'default';
    case 'ARCHIVED':
      return 'error';
    default:
      return 'default';
  }
};

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'BEGINNER':
      return 'success';
    case 'INTERMEDIATE':
      return 'warning';
    case 'ADVANCED':
      return 'error';
    default:
      return 'default';
  }
};

export const getAccessLevelColor = (accessLevel) => {
  switch (accessLevel) {
    case 'PUBLIC':
      return 'success';
    case 'RESTRICTED':
      return 'warning';
    case 'PRIVATE':
      return 'error';
    default:
      return 'default';
  }
};

export const getSubjectTypeColor = (subjectType) => {
  switch (subjectType) {
    case 'CORE':
      return 'primary';
    case 'ELECTIVE':
      return 'secondary';
    case 'GENERAL_EDUCATION':
      return 'info';
    case 'PROFESSIONAL':
      return 'warning';
    default:
      return 'default';
  }
};