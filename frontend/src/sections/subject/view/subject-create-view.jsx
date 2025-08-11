'use client';
import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { SubjectNewEditForm } from '../subject-new-edit-form';

// ----------------------------------------------------------------------

export function SubjectCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new subject"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Subjects', href: paths.dashboard.subject.root },
          { name: 'New subject' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <SubjectNewEditForm />
    </DashboardContent>
  );
}