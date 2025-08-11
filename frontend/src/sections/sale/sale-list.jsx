'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import {
  DataGridPremium,
  GridActionsCellItem,
  GridRowModes,
  // GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useGetSale, saveDeletedSales } from 'src/actions/sale';
import { Button, Link, Typography } from '@mui/material';
import { toast } from 'src/components/snackbar';
import { Label } from 'src/components/label';
import { CustomGridActionsCellItem } from 'src/components/custom-data-grid';
import { DashboardContent } from 'src/layouts/dashboard';
import { fDate } from 'src/utils/format-time';
import { SaleQuickEditForm } from './sale-quick-edit-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';

const visibleFields = [
  'commodity',
  'quantity',
  'filledQuantity',
  'status',
  'isFilled',
  'unitPrice',
  'unitPriceCurrency',
  'subTotal',
  'feeRate',
  'feeAmount',
  'incoTerm',
];

export default function DataGridPremiumDemo() {
  const [quickEditOpen, setQuickEditOpen] = React.useState(false);
  const [currentSale, setCurrentSale] = React.useState(null);
  const [selectedCount, setSelectedCount] = React.useState(0);
  const [rows, setRows] = React.useState([]);
 
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [deletedIds, setDeletedIds] = React.useState([]);
  const baseColumns = [
    {
      field: 'saleid',
      headerName: 'Sale ID',
      width: 120,
      filterable: true,
      sortable: true,
      renderCell: (params) => (
        <Link
          color="primary"
          underline="hover"
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setCurrentSale(params.row);
            setQuickEditOpen(true);
          }}
        >
          {params.row.saleid}
        </Link>
      ),
    },
    {
      field: 'sale_date',
      headerName: 'Sale Date',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 'normal' }}>
          {params.row.sale_date ? fDate(params.row.sale_date) : '-'}
        </Box>
      ),
    },
    {
      field: 'customer_code',
      headerName: 'Customer Code',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Link color="inherit" noWrap>
          {params.row.customer_code || '-'}
        </Link>
      ),
    },
    {
      field: 'product_code',
      headerName: 'Product Code',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.row.product_code || '-'}
        </Typography>
      ),
    },
    {
      type: 'number',
      field: 'sale_amount',
      headerName: 'Amount',
      width: 120,
      align: 'right',
      headerAlign: 'right',
      aggregable: false,
      // renderCell: (params) => (
      //   <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
      //     {typeof params.row.sale_amount === 'number' 
      //       ? params.row.sale_amount.toLocaleString() 
      //       : params.row.sale_amount || '0'}
      //   </Typography>
      // ),
    },
    {
      field: 'branch_code',
      headerName: 'Branch',
      width: 120,
      groupable: true,
      renderCell: (params) => (
        <Typography variant="body2" noWrap>
          {params.row.branch_code || '-'}
        </Typography>
      ),
    },
    {
      type: 'singleSelect',
      field: 'status',
      headerName: 'Status',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      groupable: false,
      valueOptions: ['pending', 'completed', 'cancelled'],
      renderCell: (params) => (
        <Label
          variant="soft"
          color={
            (params.row.status === 'completed' && 'success') ||
            (params.row.status === 'pending' && 'warning') ||
            (params.row.status === 'cancelled' && 'error') ||
            'default'
          }
        >
          {params.row.status || 'pending'}
        </Label>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              material={{
                sx: {
                  color: 'primary.main',
                },
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Iconify icon="mingcute:edit-line" />}
            label="Edit"
            className="textPrimary"
            // onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Iconify icon="mingcute:delete-2-line" />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    }
   
  ];
  
  const { sale , saleLoading, saleError, saleValidating, saleEmpty} = useGetSale();
  console.log("🚀 ~ sale:", sale)

  const apiRef = useGridApiRef();
  console.log("🚀 ~ apiRef:", apiRef)

  React.useEffect(() => {
    setRows(sale || []);
   
  }, [sale]);

 

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      // const { saveDeletedSales } = await import('src/actions/sale');
      
      // Convert to array if single id
      const saleIds = Array.isArray(id) ? id : [id];
      
      // Call API to delete from backend
      // await saveDeletedSales(saleIds, { branchCode: 'GH-101' });
      
      // Update local state after successful deletion
      setRows(rows.filter((row) => !saleIds.includes(row.saleid)));
      
      console.log("Successfully deleted sale(s):", saleIds);
    } catch (error) {
      console.error("Failed to delete sale:", error);
      // Show error message to user
      alert("Failed to delete sale. Please try again.");
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  if (saleLoading) return <div>Loading...</div>;

  return (
    <>
    <DashboardContent>
    <CustomBreadcrumbs
          heading="Sales"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Sales', href: "/sale" },
            { name: 'List' },
          ]}
          action={
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button variant="contained" startIcon={<Iconify icon="mingcute:add-line" />}>New Sale</Button>
              <Button variant="contained" startIcon={<Iconify icon="mdi:export-variant" />}>Export</Button>
              {/* <Button
                color="error"
                variant="outlined"
                startIcon={<Iconify icon="mingcute:delete-2-line" />}
                // disabled={selectedCount === 0}
                onClick={handleDeleteSelected}
              >
                ลบที่เลือก
              </Button> */}
              <Button
                color="primary"
                variant="contained"
                startIcon={<Iconify icon="mingcute:save-line" />}
                disabled={!deletedIds.length}
                onClick={handleDeleteClick}
              >
                บันทึกการลบ
              </Button>
            </Box>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />
    <Box sx={{ height: 520, width: '100%' }}>
      <DataGridPremium
        sx={{
          height: 'calc(100vh - 180px)',
          width: '100%',
          '--DataGrid-overlayHeight': '300px'
        }}
        // {...sale}
        rows={rows}
        columns={baseColumns}
        
        getRowId={(row) => row.saleid}
        label="Data Grid Premium"
        apiRef={apiRef}
        loading={saleLoading}
        rowModesModel={rowModesModel}
        // checkboxSelection
        // onRowSelectionModelChange={(newSelection) => setSelectedCount(newSelection?.length || 0)}
        onRowModesModelChange={handleRowModesModelChange}
        // disableRowSelectionOnClick
        showToolbar

     
        // initialState={initialState}
        pagination={true}
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
          aggregation: {

            model: {
              sale_amount: 'sum',
            },
          },
        }}
        // sortModel={[{ field: 'lang_id', sort: 'asc' }]}
        pageSizeOptions={[25, 50, 100, { value: -1, label: 'All' }]}
      />
    </Box>
    </DashboardContent>
      <SaleQuickEditForm
        currentSale={currentSale || {}}
        open={quickEditOpen}
        onClose={() => setQuickEditOpen(false)}
      />
    </>
  );
}