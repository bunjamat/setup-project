'use client';

import React, { useState, useCallback } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

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

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';
import { _roles, USER_STATUS_OPTIONS } from 'src/_mock';
import { useGetInstructors } from 'src/actions/instructor';
import { deleteInstructor } from 'src/actions/instructor';

import { Label } from 'src/components/label';
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

import { UserTableRow } from '../user-table-row';
import { UserTableToolbar } from '../user-table-toolbar';
import { UserTableFiltersResult } from '../user-table-filters-result';
import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'phoneNumber', label: 'Phone number', width: 180 },
  { id: 'department', label: 'Department', width: 220 },
  { id: 'ranking', label: 'Ranking', width: 180 },
  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function InstructorListView() {
  const table = useTable();

  const confirmDialog = useBoolean();

  const [tableData, setTableData] = useState([]);

  const filters = useSetState({ search: '', role: [], status: 'all' });
  const { state: currentFilters, setState: updateFilters } = filters;

  // Get instructors data from API
  const {
    instructors,
    instructorsLoading,
    instructorsError,
    pagination,
    totalCount
  } = useGetInstructors({
    page: table.page + 1, // API uses 1-based pagination
    limit: table.rowsPerPage,
    search: currentFilters.search || undefined,
    status: currentFilters.status !== 'all' ? currentFilters.status : undefined
  });

  // Update tableData when instructors data changes
  React.useEffect(() => {
    if (instructors && instructors.length > 0) {
      // Transform API data to match component expectations
      const transformedData = instructors.map(instructor => ({
        id: instructor.id,
        name: `${instructor.name}`,
        email: instructor.user.email,
        phoneNumber: instructor.user.phoneNumber || '-',
        department: instructor.department?.name || '-',
        ranking: instructor.Ranking?.name || '-',
        status: instructor?.status === 'ACTIVE' ? 'active' : 'inactive',
        role: 'Instructor',
        avatarUrl: CONFIG.serverUrl + instructor.avatarPath || null,
        // Keep original data for detailed view
        originalData: instructor
      }));
      setTableData(transformedData);
    }
  }, [instructors]);

  // Note: Filtering is now handled by API, keeping this for local sorting if needed
  const dataFiltered = tableData;

  const dataInPage = tableData; // Use all data since pagination is handled by API

  const canReset =
    !!currentFilters.search || currentFilters.role.length > 0 || currentFilters.status !== 'all';

  const notFound = (!tableData.length && canReset) || (!tableData.length && !instructorsLoading);

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        const result = await deleteInstructor(id);
        
        if (result?.success !== false) {
          toast.success('Delete success!');
          // SWR will automatically refetch data after cache invalidation
        } else {
          toast.error(result?.message || 'Failed to delete instructor');
        }
      } catch (error) {
        console.error('Delete instructor error:', error);
        toast.error('An error occurred while deleting instructor');
      }
    },
    []
  );

  const handleDeleteRows = useCallback(
    async () => {
      try {
        // Delete all selected instructors
        const deletePromises = table.selected.map(id => deleteInstructor(id));
        const results = await Promise.allSettled(deletePromises);
        
        // Check if all deletions were successful
        const failures = results.filter(result => result.status === 'rejected' || !result.value?.success);
        
        if (failures.length === 0) {
          toast.success(`Successfully deleted ${table.selected.length} instructor(s)!`);
          table.onSelectAllRows(false, []); // Clear selection
        } else {
          toast.error(`Failed to delete ${failures.length} instructor(s)`);
        }
      } catch (error) {
        console.error('Delete instructors error:', error);
        toast.error('An error occurred while deleting instructors');
      }
    },
    [table]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      updateFilters({ status: newValue });
    },
    [updateFilters, table]
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
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
            confirmDialog.onFalse();
          }}
        >
          Delete
        </Button>
      }
    />
  );

  // Show error message if API call fails
  if (instructorsError) {
    return (
      <DashboardContent>
        <CustomBreadcrumbs
          heading="อาจารย์/ผู้สอน"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Admin', href: paths.dashboard.admin.root },
            { name: 'Users', href: paths.dashboard.admin.users.root },
            { name: 'อาจารย์/ผู้สอน' },
          ]}
        />
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" color="error">
            เกิดข้อผิดพลาดในการโหลดข้อมูล
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {instructorsError.message}
          </Typography>
        </Box>
      </DashboardContent>
    );
  }

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="อาจารย์/ผู้สอน"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Admin', href: paths.dashboard.admin.root },
            { name: 'Users', href: paths.dashboard.admin.users.root },
            { name: 'อาจารย์/ผู้สอน' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.admin.users.createInstructor}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New instructor
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={currentFilters.status}
            onChange={handleFilterStatus}
            sx={[
              (theme) => ({
                px: 2.5,
                boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
              }),
            ]}
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
                      ((tab.value === 'all' || tab.value === currentFilters.status) && 'filled') ||
                      'soft'
                    }
                    color={
                      (tab.value === 'active' && 'success') ||
                      (tab.value === 'pending' && 'warning') ||
                      (tab.value === 'banned' && 'error') ||
                      'default'
                    }
                  >
                    {['active', 'pending', 'banned', 'rejected'].includes(tab.value)
                      ? tableData.filter((user) => user.status === tab.value).length
                      : totalCount || 0}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <UserTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ roles: _roles }}
          />

          {canReset && (
            <UserTableFiltersResult
              filters={filters}
              totalResults={totalCount || 0}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirmDialog.onTrue}>
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
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {instructorsLoading ? (
                    <TableEmptyRows
                      height={table.dense ? 56 : 56 + 20}
                      emptyRows={table.rowsPerPage}
                    />
                  ) : (
                    tableData.map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        editHref={paths.dashboard.admin.users.editInstructor(row.id)}
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

      {renderConfirmDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
} 