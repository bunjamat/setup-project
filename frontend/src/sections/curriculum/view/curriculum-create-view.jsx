'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CurriculumNewEditForm } from '../curriculum-new-edit-form';

// ----------------------------------------------------------------------

export function CurriculumCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="เพิ่มหลักสูตรใหม่"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'หลักสูตร', href: paths.dashboard.curriculum.list },
          { name: 'เพิ่มใหม่' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CurriculumNewEditForm />
    </DashboardContent>
  );
} 