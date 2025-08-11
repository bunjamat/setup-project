"use client";

import React, { useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useGetSubjects, activateSubject, deactivateSubject } from 'src/actions/subject';

import { Label } from 'src/components/label';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean,useSetState } from 'minimal-shared';



import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { SubjectTableRow } from '../subject-table-row';
import { SubjectTableToolbar } from '../subject-table-toolbar';
import { SubjectTableFiltersResult } from '../subject-table-filters-result';
import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'ARCHIVED', label: 'Archived' },
];

const TABLE_HEAD = [
  { id: 'title', label: 'Subject' },
  { id: 'major', label: 'Major/Program' },
  { id: 'credits', label: 'Credits', align: 'center' },
  { id: 'subjectType', label: 'Type' },
  { id: 'difficulty', label: 'Difficulty' },
  { id: 'accessLevel', label: 'Access' },
  { id: 'price', label: 'Price' },
  { id: 'status', label: 'Status' },
  { id: 'enrollmentCount', label: 'Enrollments', align: 'center' },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function SubjectListView() {
  const theme = useTheme();
  const router = useRouter();

  const table = useTable();
  const confirm = useBoolean();

  const filters = useSetState({
    search: '',
    status: 'all',
    subjectType: '',
    difficulty: '',
  });
  const { state: currentFilters, setState: updateFilters } = filters;

  // Get subjects data from API
  const {
    subjects,
    subjectsLoading,
    subjectsError,
    pagination,
    totalCount
  } = useGetSubjects({
    page: table.page + 1, // API uses 1-based pagination
    limit: table.rowsPerPage,
    search: currentFilters.search || undefined,
    status: currentFilters.status !== 'all' ? currentFilters.status : undefined
  });

  // Transform API data to match component expectations
  const tableData = React.useMemo(() => {
    if (subjects && subjects.length > 0) {
      return subjects.map(subject => ({
        id: subject.id,
        code: subject.code,
        title: subject.title,
        titleEn: subject.titleEn,
        description: subject.description,
        major: subject.major?.name || '-',
        credits: subject.credits,
        subjectType: subject.subjectType,
        difficulty: subject.difficulty,
        accessLevel: subject.accessLevel,
        price: subject.price || 0,
        status: subject.isActive ? 'active' : 'inactive',
        enrollmentCount: subject.enrollmentCount || 0,
        // Keep original data for detailed view
        originalData: subject
      }));
    }
    return [];
  }, [subjects]);

  // Note: Filtering is now handled by API, keeping this for local sorting if needed
  const dataFiltered = tableData;

  const dataInPage = tableData; // Use all data since pagination is handled by API

  const canReset =
    !!currentFilters.search || currentFilters.status !== 'all' || !!currentFilters.subjectType || !!currentFilters.difficulty;

  const notFound = (!tableData.length && canReset) || (!tableData.length && !subjectsLoading);

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      toast.success('Subject deleted successfully!');
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    toast.success('Subjects deleted successfully!');
    setTableData(deleteRows);
    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);



  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.subject.edit(id));
    },
    [router]
  );

  const handleActivateRow = useCallback(
    async (id) => {
      try {
        const result = await activateSubject(id);
        
        if (result?.success !== false) {
          toast.success('Subject activated successfully!');
          // SWR will automatically refetch data after cache invalidation
        } else {
          toast.error(result?.message || 'Failed to activate subject');
        }
      } catch (error) {
        console.error('Error activating subject:', error);
        toast.error('Failed to activate subject');
      }
    },
    []
  );

  const handleDeactivateRow = useCallback(
    async (id) => {
      try {
        const result = await deactivateSubject(id);
        
        if (result?.success !== false) {
          toast.success('Subject deactivated successfully!');
          // SWR will automatically refetch data after cache invalidation
        } else {
          toast.error(result?.message || 'Failed to deactivate subject');
        }
      } catch (error) {
        console.error('Error deactivating subject:', error);
        toast.error('Failed to deactivate subject');
      }
    },
    []
  );



  // Show error message if API call fails
  if (subjectsError) {
    return (
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Subjects"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Subjects', href: paths.dashboard.subject.root },
            { name: 'List' },
          ]}
        />
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="error">
            เกิดข้อผิดพลาดในการโหลดข้อมูล
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {subjectsError.message}
          </Typography>
        </Box>
      </DashboardContent>
    );
  }

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Subjects"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Subjects', href: paths.dashboard.subject.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.subject.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Subject
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={currentFilters.status}
            onChange={(event, newValue) => {
              updateFilters({ status: newValue });
              table.onResetPage();
            }}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                      'soft'
                    }
                    color={
                      (tab.value === 'ACTIVE' && 'success') ||
                      (tab.value === 'INACTIVE' && 'warning') ||
                      (tab.value === 'DRAFT' && 'default') ||
                      (tab.value === 'ARCHIVED' && 'error') ||
                      'default'
                    }
                  >
                    {['ACTIVE', 'INACTIVE', 'DRAFT', 'ARCHIVED'].includes(tab.value)
                      ? tableData.filter((subject) => subject.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <SubjectTableToolbar
            filters={filters.state}
            onResetPage={table.onResetPage}
            onFilters={filters.setState}
            numSelected={table.selected.length}
            onDeleteRows={() => {
              confirm.onTrue();
            }}
          />

          {canReset && (
            <SubjectTableFiltersResult
              filters={filters.state}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              onFilters={filters.setState}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headCells={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {subjectsLoading ? (
                    <TableEmptyRows
                      height={table.dense ? 56 : 76}
                      emptyRows={table.rowsPerPage}
                    />
                  ) : (
                    tableData.map((row) => (
                      <SubjectTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onActivateRow={() => handleActivateRow(row.id)}
                        onDeactivateRow={() => handleDeactivateRow(row.id)}
                      />
                    ))
                  )}

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={totalCount || 0}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name, status, subjectType, difficulty } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (subject) =>
        subject.title.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        subject.code.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((subject) => subject.status === status);
  }

  if (subjectType) {
    inputData = inputData.filter((subject) => subject.subjectType === subjectType);
  }

  if (difficulty) {
    inputData = inputData.filter((subject) => subject.difficulty === difficulty);
  }

  return inputData;
}