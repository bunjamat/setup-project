'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import { useGetInstructor } from 'src/actions/instructor';
import { InstructorNewEditForm } from '../instructor-new-edit-form';

// ----------------------------------------------------------------------

export function InstructorEditView({ instructorId }) {
  const { instructor, instructorLoading, instructorError } = useGetInstructor(instructorId);

  if (instructorLoading) {
    return <LoadingScreen />;
  }

  if (instructorError) {
    return (
      <DashboardContent>
        <CustomBreadcrumbs
          heading="แก้ไขข้อมูลอาจารย์"
          backHref={paths.dashboard.admin.users.instructors}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Admin', href: paths.dashboard.admin.root },
            { name: 'Users', href: paths.dashboard.admin.users.root },
            { name: 'อาจารย์/ผู้สอน', href: paths.dashboard.admin.users.instructors },
            { name: 'แก้ไขข้อมูล' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>เกิดข้อผิดพลาดในการโหลดข้อมูล</h3>
          <p>{instructorError?.message || 'ไม่สามารถโหลดข้อมูลอาจารย์ได้'}</p>
        </div>
      </DashboardContent>
    );
  }

  if (!instructor) {
    return (
      <DashboardContent>
        <CustomBreadcrumbs
          heading="แก้ไขข้อมูลอาจารย์"
          backHref={paths.dashboard.admin.users.instructors}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Admin', href: paths.dashboard.admin.root },
            { name: 'Users', href: paths.dashboard.admin.users.root },
            { name: 'อาจารย์/ผู้สอน', href: paths.dashboard.admin.users.instructors },
            { name: 'แก้ไขข้อมูล' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h3>ไม่พบข้อมูลอาจารย์</h3>
          <p>ไม่พบข้อมูลอาจารย์ที่ต้องการแก้ไข</p>
        </div>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="แก้ไขข้อมูลอาจารย์"
        backHref={paths.dashboard.admin.users.instructors}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Admin', href: paths.dashboard.admin.root },
          { name: 'Users', href: paths.dashboard.admin.users.root },
          { name: 'อาจารย์/ผู้สอน', href: paths.dashboard.admin.users.instructors },
          { name: instructor?.name || 'แก้ไขข้อมูล' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <InstructorNewEditForm currentInstructor={instructor} />
    </DashboardContent>
  );
} 