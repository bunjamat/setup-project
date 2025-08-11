import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const SALE_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const SaleQuickEditSchema = zod.object({
  saleid: zod.union([zod.string(), zod.number()]).optional(),
  sale_date: zod.any().optional(),
  customer_code: zod.string().min(1, { message: 'Customer code is required!' }),
  product_code: zod.string().min(1, { message: 'Product code is required!' }),
  branch_code: zod.string().min(1, { message: 'Branch code is required!' }),
  sale_amount: zod
    .union([zod.number(), zod.string()])
    .refine((v) => Number(v) >= 0, { message: 'Amount must be 0 or greater!' }),
  status: zod.string().optional(),
});

// ----------------------------------------------------------------------

export function SaleQuickEditForm({ currentSale, open, onClose }) {
  const defaultValues = {
    saleid: '',
    sale_date: null,
    customer_code: '',
    product_code: '',
    branch_code: '',
    sale_amount: 0,
    status: 'pending',
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(SaleQuickEditSchema),
    defaultValues,
    values: currentSale,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ SaleQuickEditForm ~ data:", data)
    const delay = new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      toast.promise(delay, {
        loading: 'Updating sale...',
        success: 'Sale updated!',
        error: 'Update failed!',
      });

      await delay;

      // Reset and close after success
      reset();
      onClose?.();

      // For now just log. Replace with API call when backend is ready.
      // e.g., await axios.put(`/api/sale/${data.saleid}`, data)
      // console for debug
      // eslint-disable-next-line no-console
      console.info('SALE_UPDATE_DATA', data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={!!open}
      onClose={onClose}
      slotProps={{
        paper: { sx: { maxWidth: 720 } },
      }}
    >
      <DialogTitle>แก้ไขข้อมูลการขาย</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            อัปเดตข้อมูลการขายตามต้องการ แล้วกดบันทึก
          </Alert>

          <Box
            sx={{
              rowGap: 3,
              columnGap: 2,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <Field.Text name="saleid" label="Sale ID" disabled />

            <Field.DatePicker name="sale_date" label="Sale date" />

            <Field.Text name="customer_code" label="Customer code" />

            <Field.Text name="product_code" label="Product code" />

            <Field.Text name="branch_code" label="Branch code" />

            <Field.NumberInput name="sale_amount" label="Amount" sx={{ maxWidth: 200 }} />

            <Field.Select name="status" label="Status">
              {SALE_STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            ยกเลิก
          </Button>

          <Button type="submit" variant="contained" loading={isSubmitting}>
            บันทึก
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}


