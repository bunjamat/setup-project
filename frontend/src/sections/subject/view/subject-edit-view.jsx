import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';

import { subjectApi } from 'src/actions/subject';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { SubjectNewEditForm } from '../subject-new-edit-form';

// ----------------------------------------------------------------------

export function SubjectEditView() {
  const { id } = useParams();

  const [currentSubject, setCurrentSubject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSubject = useCallback(async () => {
    try {
      const result = await subjectApi.getSubjectById(id);
      if (result.success) {
        setCurrentSubject(result.data);
      }
    } catch (error) {
      console.error('Error fetching subject:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchSubject();
    }
  }, [fetchSubject, id]);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit subject"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Subjects', href: paths.dashboard.subject.root },
          { name: currentSubject?.title || 'Edit' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {!loading && <SubjectNewEditForm currentSubject={currentSubject} />}
    </DashboardContent>
  );
}