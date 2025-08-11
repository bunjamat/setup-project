'use client';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { mutate } from 'swr';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { fData } from 'src/utils/format-number';
import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { InstructorCredentialsDialog } from './instructor-credentials-dialog';

import { useGetDepartments, useGetRankings, createInstructor, updateInstructor } from 'src/actions/instructor';
import { endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

// Schema for creating new instructor
export const InstructorCreateSchema = zod.object({
  // User fields (required for new instructor)
  email: zod.string().email({ message: 'Email is required!' }),
  username: zod.string().min(3, { message: 'Username must be at least 3 characters!' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters!' }),
  firstName: zod.string().min(1, { message: 'First name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required!' }),
  phoneNumber: zod.string().optional(),
  
  // Instructor fields (required)
  name: zod.string().min(1, { message: 'Display name is required!' }),
  departmentId: zod.union([zod.string(), zod.number()])
    .refine((val) => val !== '' && val !== null && val !== undefined, { message: 'Department is required!' })
    .transform((val) => parseInt(String(val), 10)),
  
  // Instructor fields (optional)
  position: zod.string().optional(),
  rankingId: zod.union([zod.string(), zod.number()]).optional()
    .transform((val) => val && val !== '' ? parseInt(String(val), 10) : undefined),
  description: zod.string().optional(),
  status: zod.enum(['ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED']).default('ACTIVE'),
  avatar: schemaHelper.file({ message: 'Avatar is optional!' }).optional(),
});

// Schema for updating existing instructor
export const InstructorUpdateSchema = zod.object({
  // User fields (no username/password for update)
  email: zod.string().email({ message: 'Email is required!' }),
  firstName: zod.string().min(1, { message: 'First name is required!' }),
  lastName: zod.string().min(1, { message: 'Last name is required!' }),
  phoneNumber: zod.string().optional(),
  
  // Instructor fields (required)
  name: zod.string().min(1, { message: 'Display name is required!' }),
  departmentId: zod.union([zod.string(), zod.number()])
    .refine((val) => val !== '' && val !== null && val !== undefined, { message: 'Department is required!' })
    .transform((val) => parseInt(String(val), 10)),
  
  // Instructor fields (optional)
  position: zod.string().optional(),
  rankingId: zod.union([zod.string(), zod.number()]).optional()
    .transform((val) => val && val !== '' ? parseInt(String(val), 10) : undefined),
  description: zod.string().optional(),
  status: zod.enum(['ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED']).default('ACTIVE'),
  avatar: schemaHelper.file({ message: 'Avatar is optional!' }).optional(),
});

// ----------------------------------------------------------------------

// Helper function to transform nested instructor data to flat form data
const transformInstructorToFormData = (instructor) => {
  if (!instructor) return null;
  
  return {
    // User fields from instructor.user
    email: instructor.user?.email || '',
    firstName: instructor.user?.firstName || '',
    lastName: instructor.user?.lastName || '',
    phoneNumber: instructor.user?.phoneNumber || '',
    
    // Instructor fields from root level
    name: instructor.name || '',
    departmentId: instructor.departmentId ? String(instructor.departmentId) : '', // Convert to string
    position: instructor.position || '',
    rankingId: instructor.rankingId ? String(instructor.rankingId) : '', // Convert to string
    description: instructor.description || '',
    status: instructor.status || 'ACTIVE',
    // For avatar, prepend server URL to make it a full URL
    avatar: instructor.avatarPath ? `${CONFIG.serverUrl}${instructor.avatarPath}` : null,
  };
};

export function InstructorNewEditForm({ currentInstructor }) {
  const router = useRouter();
  const [credentialsDialogOpen, setCredentialsDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Use SWR hooks for data fetching
  const { departments, departmentsLoading, departmentsError } = useGetDepartments();
  const { rankings, rankingsLoading, rankingsError } = useGetRankings();

  const defaultValues = {
    // User fields
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    
    // Instructor fields
    name: '',
    departmentId: '', // Keep as empty string for dropdown
    position: '',
    rankingId: '', // Keep as empty string for dropdown
    description: '',
    status: 'ACTIVE',
    avatar: null,
  };

  // Transform currentInstructor data to match form structure
  const formData = currentInstructor ? transformInstructorToFormData(currentInstructor) : defaultValues;

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(currentInstructor ? InstructorUpdateSchema : InstructorCreateSchema),
    defaultValues: formData,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  // Check for loading states and errors
  const isLoading = departmentsLoading || rankingsLoading;
  const hasError = departmentsError || rankingsError;

  // Show error message if data loading fails
  if (hasError) {
    toast.error('Failed to load form data');
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      let result;
      
      if (currentInstructor) {
        // Update mode
        result = await updateInstructor(currentInstructor.id, data);
      } else {
        // Create mode
        result = await createInstructor(data);
      }

      if (result?.success) {
        toast.success(currentInstructor ? 'Update success!' : 'Create success!');
        
        if (currentInstructor) {
          // For update mode, invalidate cache to refresh data but stay on page
          setIsRefreshing(true);
          
          const instructorEndpoint = endpoints.instructor?.list || '/api/instructors';
          await mutate(`${instructorEndpoint}/${currentInstructor.id}`);
          await mutate(instructorEndpoint);
          
          // Reset form with new data if available
          if (result.data) {
            const newFormData = transformInstructorToFormData(result.data);
            reset(newFormData);
          }
          
          setIsRefreshing(false);
        } else {
          // For create mode, redirect to instructors list
          reset();
          router.push(paths.dashboard.admin.users.instructors);
        }
      } else {
        toast.error(result?.message || 'Failed to save instructor');
      }

      console.info('DATA', result);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || 'An error occurred while saving');
      setIsRefreshing(false);
    }
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isRefreshing) {
    return <Typography>Refreshing data...</Typography>;
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentInstructor && (
              <Label
                color={
                  (values.status === 'ACTIVE' && 'success') ||
                  (values.status === 'INACTIVE' && 'error') ||
                  (values.status === 'SUSPENDED' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="avatar"
                maxSize={5 * 1024 * 1024} // 5MB limit
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.webp, *.gif
                    <br /> max size of {fData(5 * 1024 * 1024)}
                  </Typography>
                }
              />
            </Box>

            {currentInstructor && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value === 'INACTIVE'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'INACTIVE' : 'ACTIVE')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Inactive
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disable instructor account
                    </Typography>
                  </>
                }
                sx={{
                  mx: 0,
                  mb: 3,
                  width: 1,
                  justifyContent: 'space-between',
                }}
              />
            )}

            {currentInstructor && (
              <Stack sx={{ mt: 3, alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Button 
                  variant="soft" 
                  color="warning"
                  onClick={() => setCredentialsDialogOpen(true)}
                >
                  เปลี่ยนชื่อผู้ใช้/รหัสผ่าน
                </Button>
                <Button variant="soft" color="error">
                  Delete instructor
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              {/* User Account Information */}
              <Typography variant="h6" sx={{ gridColumn: '1 / -1', mb: 1 }}>
                User Account Information
              </Typography>
              
              <Field.Text name="firstName" label="First Name" />
              <Field.Text name="lastName" label="Last Name" />
              <Field.Text name="email" label="Email" type="email" />
              
              {!currentInstructor && (
                <>
                  <Field.Text name="username" label="Username" />
                  <Field.Text name="password" label="Password" type="password" />
                </>
              )}
              
              <Field.Text name="phoneNumber" label="Phone Number" />

              {/* Instructor Profile Information */}
              <Typography variant="h6" sx={{ gridColumn: '1 / -1', mt: 2, mb: 1 }}>
                Instructor Profile Information
              </Typography>
              
              <Field.Text name="name" label="Display Name" />
              <Field.Text name="position" label="Position" />

              <Field.Select name="departmentId" label="Department">
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Field.Select>

              <Field.Select name="rankingId" label="Academic Ranking">
                <MenuItem value="">None</MenuItem>
                {rankings.map((rank) => (
                  <MenuItem key={rank.id} value={rank.id}>
                    {rank.name}
                  </MenuItem>
                ))}
              </Field.Select>

              <Field.Select name="status" label="Status">
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="SUSPENDED">Suspended</MenuItem>
              </Field.Select>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Field.Text 
                name="description" 
                label="Description" 
                multiline 
                rows={4}
                fullWidth
              />
            </Box>

            <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
              <Button type="submit" variant="contained" loading={isSubmitting}>
                {!currentInstructor ? 'Create instructor' : 'Save changes'}
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Credentials Dialog */}
      <InstructorCredentialsDialog
        open={credentialsDialogOpen}
        onClose={() => setCredentialsDialogOpen(false)}
        instructor={currentInstructor}
        onSuccess={() => {
          // Optionally refresh instructor data or show success message
          toast.success('อัปเดตข้อมูลการเข้าสู่ระบบสำเร็จ!');
        }}
      />
    </Form>
  );
} 