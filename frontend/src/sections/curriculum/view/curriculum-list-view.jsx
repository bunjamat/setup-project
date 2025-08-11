'use client';

import { orderBy } from 'es-toolkit';
import { useState, useCallback } from 'react';
import { useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CURRICULUM_STATUS_OPTIONS } from 'src/_mock';
import { useGetMajors } from 'src/actions/majors';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CurriculumSort } from '../curriculum-sort';
import { CurriculumSearch } from '../curriculum-search';
import { CurriculumListHorizontal } from '../curriculum-list-horizontal';
import { useGetCurriculums, useGetFaculties } from 'src/actions/curriculum';
import { useGetDepartments } from 'src/actions/departments';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = CURRICULUM_STATUS_OPTIONS;

const CURRICULUM_SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

// ----------------------------------------------------------------------

export function CurriculumListView() {
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState([]);

  const { state, setState } = useSetState({ status: 'all' });

  // Map UI status to API status
  const mapStatusToApi = (s) => {
    if (!s || s === 'all') return undefined;
    const upper = String(s).toUpperCase();
    if (['ACTIVE', 'INACTIVE', 'DRAFT'].includes(upper)) return upper;
    return undefined; // ignore unsupported statuses like 'archived'
  };

  // Determine selected major for server-side filter (use first if multiple)
  const selectedMajorId = selectedMajors.length > 0 ? selectedMajors[0]?.id : undefined;

  // Get curriculums data from API with server-side filters
  const { curriculums, curriculumsLoading } = useGetCurriculums({
    search: searchQuery || undefined,
    status: mapStatusToApi(state.status),
    majorId: selectedMajorId,
  });

  // Get faculties and majors for filters
  const { departments } = useGetDepartments();

  // Get majors via API filtered by selected department (when exactly one is selected)
  const singleDepartmentId =
    selectedDepartments.length === 1 ? selectedDepartments[0].id : undefined;
  const { majors: availableMajors } = useGetMajors({ departmentId: singleDepartmentId });

  const dataFiltered = applyFilter({
    inputData: curriculums,
    filters: { status: state.status },
    sortBy,
  });

  const canReset =
    state.status !== 'all' ||
    !!searchQuery ||
    selectedDepartments.length > 0 ||
    selectedMajors.length > 0;

  const notFound =
    (!dataFiltered.length && canReset) || (!dataFiltered.length && !curriculumsLoading);

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      setState({ status: newValue });
    },
    [setState]
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="คลังหลักสูตร"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'คลังหลักสูตร' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.curriculum.new}
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            เพิ่มหลักสูตรใหม่
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Box
        sx={{
          gap: 3,
          display: 'flex',
          mb: { xs: 3, md: 5 },
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-end', sm: 'center' },
        }}
      >
        <CurriculumSearch onSearch={setSearchQuery} />

        <CurriculumSort
          sort={sortBy}
          onSort={(newValue) => setSortBy(newValue)}
          sortOptions={CURRICULUM_SORT_OPTIONS}
        />
      </Box>

      <Box
        sx={{
          gap: 3,
          display: 'grid',
          mb: { xs: 3, md: 5 },
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        }}
      >
        <Autocomplete
          fullWidth
          multiple
          limitTags={3}
          options={departments}
          getOptionLabel={(option) => option.name}
          value={selectedDepartments}
          onChange={(event, newValue) => {
            setSelectedDepartments(newValue);
            // Reset majors when faculties change
            setSelectedMajors([]);
          }}
          renderInput={(params) => (
            <TextField {...params} label="เลือกคณะ" placeholder="เลือกคณะที่ต้องการ" />
          )}
          slotProps={{
            chip: { size: 'small', variant: 'soft' },
          }}
        />

        <Autocomplete
          fullWidth
          multiple
          limitTags={3}
          options={availableMajors}
          getOptionLabel={(option) => option.name}
          value={selectedMajors}
          onChange={(event, newValue) => setSelectedMajors(newValue)}
          disabled={selectedDepartments.length === 0}
          renderInput={(params) => (
            <TextField
              {...params}
              label="เลือกสาขา"
              placeholder={
                selectedDepartments.length === 0 ? 'เลือกคณะก่อน' : 'เลือกสาขาที่ต้องการ'
              }
            />
          )}
          slotProps={{
            chip: { size: 'small', variant: 'soft' },
          }}
        />
      </Box>

      <Tabs value={state.status} onChange={handleFilterStatus} sx={{ mb: { xs: 3, md: 5 } }}>
        {STATUS_OPTIONS.map((tab) => (
          <Tab
            key={tab.value}
            iconPosition="end"
            value={tab.value}
            label={tab.label}
            icon={
              <Label
                variant={
                  ((tab.value === 'all' || tab.value === state.status) && 'filled') || 'soft'
                }
                color={
                  (tab.value === 'active' && 'success') ||
                  (tab.value === 'inactive' && 'warning') ||
                  (tab.value === 'archived' && 'error') ||
                  (tab.value === 'draft' && 'info') ||
                  'default'
                }
              >
                {tab.value === 'all' && curriculums.length}
                {tab.value === 'active' &&
                  curriculums.filter((curriculum) => curriculum.status === 'ACTIVE').length}
                {tab.value === 'inactive' &&
                  curriculums.filter((curriculum) => curriculum.status === 'INACTIVE').length}
                {tab.value === 'archived' && 0}
                {tab.value === 'draft' &&
                  curriculums.filter((curriculum) => curriculum.status === 'DRAFT').length}
              </Label>
            }
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>

      <CurriculumListHorizontal curriculums={dataFiltered} loading={curriculumsLoading} />
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters, sortBy }) {
  const { status, search, departments, majors } = filters;
  const statusUpper = typeof status === 'string' ? status.toUpperCase() : undefined;

  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'alphabetical') {
    inputData = orderBy(inputData, ['name'], ['asc']);
  }

  if (statusUpper && statusUpper !== 'ALL') {
    inputData = inputData.filter((curriculum) => curriculum.status === statusUpper);
  }

  if (search) {
    inputData = inputData.filter(
      (curriculum) =>
        curriculum.name.toLowerCase().includes(search.toLowerCase()) ||
        curriculum.nameEn?.toLowerCase().includes(search.toLowerCase()) ||
        curriculum.code.toLowerCase().includes(search.toLowerCase()) ||
        curriculum.department?.name?.toLowerCase().includes(search.toLowerCase()) ||
        curriculum.major?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by selected faculties
  if (departments && departments.length > 0) {
    inputData = inputData.filter((curriculum) =>
      departments.some(
        (department) =>
          curriculum.departmentId === department.id ||
          curriculum.department?.id === department.id ||
          curriculum.department?.name === department.name
      )
    );
  }

  // Filter by selected majors
  if (majors && majors.length > 0) {
    inputData = inputData.filter((curriculum) =>
      majors.some(
        (major) =>
          curriculum.majorId === major.id ||
          curriculum.major?.id === major.id ||
          curriculum.major?.name === major.name
      )
    );
  }

  return inputData;
}
