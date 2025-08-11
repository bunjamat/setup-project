'use client';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fNumber } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

import { _courses } from 'src/_mock';
import { useGetCurriculum } from 'src/actions/curriculum';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { LoadingScreen } from 'src/components/loading-screen';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ElearningCourseItem } from 'src/sections/_elearning/list/elearning-course-item';

// ----------------------------------------------------------------------

export function CurriculumDetailsView({ id }) {
  const { curriculum, curriculumLoading, curriculumError } = useGetCurriculum(id);
  
  // Get related courses (mock data for now)
  const relatedCourses = _courses.slice(0, 3); // Show 3 related courses

  if (curriculumLoading) {
    return (
      <DashboardContent>
        <LoadingScreen />
      </DashboardContent>
    );
  }

  if (curriculumError || !curriculum) {
    return (
      <DashboardContent>
        <EmptyContent
          title="ไม่พบข้อมูลหลักสูตร"
          description="ไม่พบหลักสูตรที่ระบุ หรือหลักสูตรอาจถูกลบไปแล้ว"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.curriculum.root}
              variant="contained"
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              กลับสู่รายการหลักสูตร
            </Button>
          }
        />
      </DashboardContent>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'archived':
        return 'error';
      case 'draft':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <DashboardContent>
      <Container maxWidth={false} sx={{ px: { sm: 5 } }}>
        <CustomBreadcrumbs
          heading="รายละเอียดหลักสูตร"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'คลังหลักสูตร', href: paths.dashboard.curriculum.root },
            { name: curriculum.name },
          ]}
          action={
            <Stack direction="row" spacing={1}>
              <Button
                component={RouterLink}
                href={paths.dashboard.curriculum.edit(id)}
                variant="contained"
                startIcon={<Iconify icon="solar:pen-bold" />}
              >
                แก้ไข
              </Button>
              <Button
                component={RouterLink}
                href={paths.dashboard.curriculum.root}
                variant="outlined"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
              >
                กลับ
              </Button>
            </Stack>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Header Card */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h4" component="h1">
                        {curriculum.name}
                      </Typography>
                      {curriculum.isDefault && (
                        <Chip size="small" label="Default" color="primary" variant="filled" />
                      )}
                    </Box>
                    
                    <Typography variant="h6" color="text.secondary">
                      {curriculum.nameEn}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        รหัสหลักสูตร: {curriculum.code}
                      </Typography>
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="body2" color="text.secondary">
                        ปีการศึกษา: {curriculum.academicYear}
                      </Typography>
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="body2" color="text.secondary">
                        รุ่น: {curriculum.version}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack spacing={1} alignItems="flex-end">
                    <Label variant="soft" color={getStatusColor(curriculum.status)}>
                      {curriculum.status}
                    </Label>
                    <Typography variant="caption" color="text.disabled">
                      แก้ไขล่าสุด: {fDate(curriculum.updatedAt)}
                    </Typography>
                  </Stack>
                </Box>

                <Divider />

                <Typography variant="body1" color="text.secondary">
                  {curriculum.description}
                </Typography>
              </Stack>
            </Card>

            {/* Academic Structure */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                โครงสร้างหลักสูตร
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.contrastText',
                      }}
                    >
                      <Iconify icon="solar:bookmark-bold" width={24} />
                    </Box>
                    <Typography variant="h4" color="primary">
                      {curriculum.totalCredits}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      หน่วยกิตรวม
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'success.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'success.contrastText',
                      }}
                    >
                      <Iconify icon="solar:shield-check-bold" width={24} />
                    </Box>
                    <Typography variant="h4" color="success.main">
                      {curriculum.coreCredits}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      วิชาแกน
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'warning.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'warning.contrastText',
                      }}
                    >
                      <Iconify icon="solar:star-bold" width={24} />
                    </Box>
                    <Typography variant="h4" color="warning.main">
                      {curriculum.majorCredits}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      วิชาเอก
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Stack spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'info.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'info.contrastText',
                      }}
                    >
                      <Iconify icon="solar:slider-vertical-bold" width={24} />
                    </Box>
                    <Typography variant="h4" color="info.main">
                      {curriculum.electiveCredits}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      วิชาเลือก
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Card>

            {/* Educational Objectives */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                วัตถุประสงค์การศึกษา
              </Typography>
              <Stack spacing={1}>
                {curriculum.objectives?.map((objective, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                      {index + 1}.
                    </Typography>
                    <Typography variant="body2">
                      {objective}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Card>

            {/* Learning Outcomes */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ผลการเรียนรู้ที่คาดหวัง
              </Typography>
              <Stack spacing={1}>
                {curriculum.learningOutcomes?.map((outcome, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Iconify icon="solar:check-circle-bold" color="success.main" sx={{ mt: 0.5 }} width={16} />
                    <Typography variant="body2">
                      {outcome}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Card>

            {/* Career Prospects */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                อาชีพที่สามารถประกอบได้
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {curriculum.careerProspects?.map((career, index) => (
                  <Chip key={index} label={career} variant="outlined" size="small" />
                ))}
              </Box>
            </Card>

            {/* Related Courses */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                รายวิชาที่เกี่ยวข้อง
              </Typography>

              {/* Add Course Card */}
              <Card
                    component={RouterLink}
                    href={`${paths.dashboard.subject.new}?curriculumId=${id}`}
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      border: '1px dashed',
                      borderColor: 'grey.300',
                      bgcolor: 'grey.50',
                      cursor: 'pointer',
                      minHeight: 160,
                      width: '100%',
                      textDecoration: 'none !important',
                      color: 'inherit',
                      transition: (theme) => theme.transitions.create(['all']),
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.lighter',
                        transform: 'translateY(-2px)',
                        boxShadow: (theme) => theme.vars.customShadows.z8,
                        textDecoration: 'none !important',
                      },
                      '&:focus': {
                        textDecoration: 'none !important',
                      },
                      '&:active': {
                        textDecoration: 'none !important',
                      },
                    }}
                  >
                    {/* Image Section */}
                    <Box
                      sx={{
                        width: { xs: '100%', sm: 200 },
                        height: { xs: 120, sm: 160 },
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'background.paper',
                        position: 'relative',
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'primary.contrastText',
                          boxShadow: (theme) => theme.vars.customShadows.primary,
                        }}
                      >
                        <Iconify icon="mingcute:add-line" width={28} />
                      </Box>
                    </Box>

                    {/* Content Section */}
                    <Box
                      sx={{
                        p: 2.5,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flexGrow: 1,
                        gap: 1.5,
                      }}
                    >
                      <Box>
                        <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600 }}>
                          เพิ่มรายวิชา
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.primary', mt: 0.5 }}>
                          สร้างรายวิชาใหม่
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{ 
                          color: 'text.secondary',
                          lineHeight: 1.5,
                        }}
                      >
                        คลิกเพื่อเพิ่มรายวิชาในหลักสูตรนี้
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 'auto' }}>
                        <Iconify icon="eva:arrow-forward-fill" sx={{ color: 'primary.main' }} width={16} />
                        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
                          เริ่มสร้าง
                        </Typography>
                      </Box>
                    </Box>
                  </Card>

              <Grid container spacing={3} sx={{ mt: 2 }}>
                {/* Related Courses List */}
                {relatedCourses.map((course) => (
                  <Grid item xs={12} key={course.id}>
                    <ElearningCourseItem course={course} isVertical={false} />
                  </Grid>
                ))}

                {relatedCourses.length === 0 && (
                  <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center', py: 5 }}>
                      <Typography variant="body2" color="text.secondary">
                        ยังไม่มีรายวิชาในหลักสูตรนี้
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Basic Information */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ข้อมูลพื้นฐาน
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    คณะ
                  </Typography>
                  <Typography variant="body2">
                    {curriculum.faculty?.name}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    สาขาวิชา
                  </Typography>
                  <Typography variant="body2">
                    {curriculum.major?.name}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    ระดับปริญญา
                  </Typography>
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {curriculum.degreeLevel}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    ระยะเวลาศึกษา
                  </Typography>
                  <Typography variant="body2">
                    {curriculum.duration} ปี
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    ผู้ประสานงาน
                  </Typography>
                  <Typography variant="body2">
                    {curriculum.coordinator}
                  </Typography>
                </Box>
              </Stack>
            </Card>

            {/* Statistics */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                สถิติ
              </Typography>
              
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    จำนวนรายวิชา
                  </Typography>
                  <Typography variant="subtitle2">
                    {fNumber(curriculum.totalSubjects)} รายวิชา
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    นักศึกษาปัจจุบัน
                  </Typography>
                  <Typography variant="subtitle2">
                    {fNumber(curriculum.totalStudents)} คน
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    การลงทะเบียน
                  </Typography>
                  <Typography variant="subtitle2">
                    {fNumber(curriculum.enrollmentCount)} ครั้ง
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    ผู้สำเร็จการศึกษา
                  </Typography>
                  <Typography variant="subtitle2">
                    {fNumber(curriculum.graduateCount)} คน
                  </Typography>
                </Box>
              </Stack>
            </Card>

            {/* Approval Information */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ข้อมูลการอนุมัติ
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    อนุมัติโดย
                  </Typography>
                  <Typography variant="body2">
                    {curriculum.approvedBy}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    วันที่อนุมัติ
                  </Typography>
                  <Typography variant="body2">
                    {fDate(curriculum.approvedDate)}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    วันที่มีผล
                  </Typography>
                  <Typography variant="body2">
                    {fDate(curriculum.effectiveDate)}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    ครั้งที่แก้ไข
                  </Typography>
                  <Typography variant="body2">
                    ครั้งที่ {curriculum.revision}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </DashboardContent>
  );
}
