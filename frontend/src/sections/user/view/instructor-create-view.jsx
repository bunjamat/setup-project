'use client';

import { DashboardContent } from 'src/layouts/dashboard';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { InstructorNewEditForm } from '../instructor-new-edit-form';

// ----------------------------------------------------------------------

export function InstructorCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new instructor"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Admin', href: paths.dashboard.admin.root },
          { name: 'Users', href: paths.dashboard.admin.users.root },
          { name: 'Instructors', href: paths.dashboard.admin.users.instructors },
          { name: 'New Instructor' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <InstructorNewEditForm />
    </DashboardContent>
  );
} 