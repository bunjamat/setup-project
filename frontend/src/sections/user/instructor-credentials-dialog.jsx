'use client';

import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { FormProvider } from 'react-hook-form';

import { updateInstructorCredentials } from 'src/actions/instructor';

// ----------------------------------------------------------------------

const CredentialsSchema = zod.object({
  username: zod.string()
    .optional()
    .refine((val) => !val || val.trim() === '' || val.trim().length >= 3, {
      message: 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร!'
    }),
  password: zod.string()
    .optional()
    .refine((val) => !val || val.trim() === '' || val.trim().length >= 6, {
      message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร!'
    }),
}).refine((data) => {
  const hasUsername = data.username && data.username.trim().length > 0;
  const hasPassword = data.password && data.password.trim().length > 0;
  return hasUsername || hasPassword;
}, {
  message: 'กรุณากรอกชื่อผู้ใช้หรือรหัสผ่านอย่างน้อย 1 ช่อง',
  path: ['username'],
});

// ----------------------------------------------------------------------

export function InstructorCredentialsDialog({ open, onClose, instructor, onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(CredentialsSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // เตรียมข้อมูลที่จะส่ง (เฉพาะที่มีค่า)
      const payload = {};
      if (data.username?.trim()) payload.username = data.username.trim();
    
      if (data.password?.trim()) payload.password = data.password.trim();

      if (Object.keys(payload).length === 0) {
        toast.error('กรุณากรอกข้อมูลอย่างน้อย 1 ช่อง');
        return;
      }

      const result = await updateInstructorCredentials(instructor.id, payload);

      if (result?.success) {
        toast.success('เปลี่ยนข้อมูลการเข้าสู่ระบบสำเร็จ!');
        reset();
        onClose();
        onSuccess?.();
      } else {
        toast.error(result?.message || 'เกิดข้อผิดพลาดในการเปลี่ยนข้อมูล');
      }
    } catch (error) {
      console.error('Error updating credentials:', error);
      toast.error(error?.message || 'เกิดข้อผิดพลาดในการเปลี่ยนข้อมูล');
    }
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onSubmit();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">เปลี่ยนข้อมูลการเข้าสู่ระบบ</Typography>
          <IconButton onClick={handleClose}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>
      </DialogTitle>

      <FormProvider {...methods}>
        <form onSubmit={handleFormSubmit}>
          <DialogContent dividers>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                อาจารย์: {instructor?.user?.firstName} {instructor?.user?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                อีเมล: {instructor?.user?.email}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Field.Text
                name="username"
                label="ชื่อผู้ใช้ใหม่"
                placeholder="กรอกชื่อผู้ใช้ใหม่ (ถ้าต้องการเปลี่ยน)"
                helperText="ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร"
              />

              <Field.Text
                name="password"
                label="รหัสผ่านใหม่"
                type={showPassword ? 'text' : 'password'}
                placeholder="กรอกรหัสผ่านใหม่ (ถ้าต้องการเปลี่ยน)"
                helperText="รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'warning.lighter', borderRadius: 1 }}>
              <Typography variant="body2" color="warning.dark">
                <strong>หมายเหตุ:</strong>
                <br />
                • คุณสามารถเปลี่ยนเฉพาะชื่อผู้ใช้ หรือเฉพาะรหัสผ่าน หรือทั้งคู่ก็ได้
                <br />
                • ช่องที่ไม่ต้องการเปลี่ยนสามารถเว้นว่างไว้ได้
                <br />
                • การเปลี่ยนแปลงจะมีผลทันทีหลังจากบันทึก
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={handleClose} color="inherit">
              ยกเลิก
            </Button>
            <Button
              type="submit"
              variant="contained"
              loading={isSubmitting}
              startIcon={<Iconify icon="solar:shield-keyhole-bold" />}
            >
              เปลี่ยนข้อมูลการเข้าสู่ระบบ
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
} 