import { z as zod } from 'zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { Upload } from 'src/components/upload';

import { createCurriculum, updateCurriculum } from 'src/actions/curriculum';
import { useGetMajors } from 'src/actions/majors';

// Mock data for programs - ในอนาคตจะเปลี่ยนเป็น API calls
const MOCK_PROGRAMS = [
  { id: 3, name: 'หลักสูตรวิทยาศาสตรบัณฑิต', level: 'BACHELOR' },
  { id: 4, name: 'หลักสูตรศิลปศาสตรบัณฑิต', level: 'BACHELOR' },
];

export const NewCurriculumSchema = zod
  .object({
    // Basic Info
    name: zod.string().min(1, { message: 'ชื่อหลักสูตรต้องไม่ว่าง!' }),
    shortName: zod.string().optional(),
    year: zod
      .union([zod.string(), zod.number()])
      .transform((val) => {
        const str = String(val ?? '');
        const parsed = parseInt(str, 10);
        return Number.isFinite(parsed) ? parsed : NaN;
      })
      .refine((val) => Number.isFinite(val) && val >= 1900 && val <= 4000, {
        message: 'ปี พ.ศ. ต้องอยู่ระหว่าง 1900-4000',
        path: ['year'],
      }),
    academicYear: zod
      .union([zod.string(), zod.number(), zod.undefined()])
      .transform((val) => {
        const str = String(val ?? '');
        const parsed = parseInt(str, 10);
        return Number.isFinite(parsed) ? parsed : undefined; // ส่ง undefined ถ้าเว้นว่าง
      })
      .optional(),
    version: zod.string().min(1, { message: 'เวอร์ชันต้องไม่ว่าง!' }),

    // Academic Info
    programId: zod
      .union([zod.string(), zod.number()])
      .transform((val) => {
        const str = String(val ?? '');
        const parsed = parseInt(str, 10);
        return Number.isFinite(parsed) ? parsed : 0;
      })
      .refine((val) => val > 0, { message: 'กรุณาเลือกหลักสูตรหลัก', path: ['programId'] }),
    majorId: zod
      .union([zod.string(), zod.number()])
      .transform((val) => {
        const str = String(val ?? '');
        const parsed = parseInt(str, 10);
        return Number.isFinite(parsed) ? parsed : 0;
      })
      .refine((val) => val > 0, { message: 'กรุณาเลือกสาขาวิชา', path: ['majorId'] }),

    // Credits
    totalCredits: zod
      .union([zod.string(), zod.number()])
      .optional()
      .transform((val) => {
        const str = String(val ?? '');
        return str === '' ? 0 : parseInt(str, 10);
      }),
    coreCredits: zod
      .union([zod.string(), zod.number()])
      .optional()
      .transform((val) => {
        const str = String(val ?? '');
        return str === '' ? 0 : parseInt(str, 10);
      }),
    electiveCredits: zod
      .union([zod.string(), zod.number()])
      .optional()
      .transform((val) => {
        const str = String(val ?? '');
        return str === '' ? 0 : parseInt(str, 10);
      }),
    generalCredits: zod
      .union([zod.string(), zod.number()])
      .optional()
      .transform((val) => {
        const str = String(val ?? '');
        return str === '' ? 0 : parseInt(str, 10);
      }),

    // Optional contents
    description: zod.string().optional(),
    coverImage: zod.string().optional(),
    introVideo: zod.string().optional(),
    // startDate: zod.union([zod.string(), zod.null()]).optional(),
    // endDate: zod.union([zod.string(), zod.null()]).optional(), // ถ้าไม่มีก็ไม่ต้องกำหนด
    isActive: zod.boolean().optional(),
    status: zod.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).default('DRAFT'),
  })
  .refine(
    (data) => {
      const core = data.coreCredits || 0;
      const elective = data.electiveCredits || 0;
      const general = data.generalCredits || 0;
      const total = data.totalCredits || 0;
      return core + elective + general <= total;
    },
    {
      message: 'ผลรวมหน่วยกิตย่อยต้องไม่เกินหน่วยกิตรวม!',
      path: ['totalCredits'],
    }
  );

// ----------------------------------------------------------------------

export function CurriculumNewEditForm({ currentCurriculum }) {
  const router = useRouter();

  const openDetails = useBoolean(true);
  const openAcademic = useBoolean(true);
  const openProperties = useBoolean(true);

  const defaultValues = {
    name: '',
    shortName: '',
    year: new Date().getFullYear() + 543, // ปี พ.ศ.
    academicYear: new Date().getFullYear() + 543,
    version: '1.0',
    programId: '',
    majorId: '',
    totalCredits: 130,
    coreCredits: 0,
    electiveCredits: 0,
    generalCredits: 0,
    // startDate: '', // ถ้าไม่มีก็ไม่ต้องกำหนด
    // endDate: '', // ถ้าไม่มีก็ไม่ต้องกำหนด
    description: '',
    coverImage: '',
    introVideo: '',
    isActive: true,
    status: 'DRAFT',
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewCurriculumSchema),
    defaultValues,
    values: currentCurriculum,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  // Cover image upload (single file)
  const [file, setFile] = useState(null);
  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles?.[0];
    setFile(newFile || null);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      let result;
      
      if (currentCurriculum) {
        // Update mode
        result = await updateCurriculum(currentCurriculum.id, { ...data, coverImageFile: file || undefined });
      } else {
        // Create mode
        result = await createCurriculum({ ...data, coverImageFile: file || undefined });
      }

      if (result?.success !== false) {
        reset();
        toast.success(currentCurriculum ? 'อัปเดตหลักสูตรสำเร็จ!' : 'สร้างหลักสูตรสำเร็จ!');
        router.push(paths.dashboard.curriculum.list);
      } else {
        toast.error(result?.message || 'เกิดข้อผิดพลาดในการบันทึก');
      }

      console.info('DATA', result);
    } catch (error) {
      console.error(error);
      toast.error('เกิดข้อผิดพลาดในการบันทึก');
    }
  });

  // Auto-calculate remaining credits using useEffect
  useEffect(() => {
    const core = values.coreCredits || 0;
    const elective = values.electiveCredits || 0;
    const general = values.generalCredits || 0;
    const total = values.totalCredits || 0;
    
    const used = core + elective + general;
    const remaining = total - used;
    
    if (remaining < 0 && total > 0) {
      // Only show warning if total credits is set and we're over the limit
      console.warn('Credit limit exceeded');
    }
  }, [values.coreCredits, values.electiveCredits, values.generalCredits, values.totalCredits]);

  // Get majors based on selected program using API hook
  const { majors: availableMajors, majorsLoading: majorsLoading } = useGetMajors({ programId: values.programId || undefined });

  // Auto-set programId from selected major (if backend requires programId)
  useEffect(() => {
    const selectedMajor = availableMajors?.find?.((m) => m.id === values.majorId);
    if (selectedMajor?.programId && values.programId !== selectedMajor.programId) {
      setValue('programId', selectedMajor.programId, { shouldValidate: true });
    }
  }, [availableMajors, values.majorId, values.programId, setValue]);

  const renderCollapseButton = (value, onToggle) => (
    <IconButton onClick={onToggle}>
      <Iconify icon={value ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'} />
    </IconButton>
  );

  const renderDetails = () => (
    <Card>
      <CardHeader
        title="ข้อมูลพื้นฐาน"
        subheader="ชื่อหลักสูตร ปีการศึกษา และเวอร์ชัน"
        action={renderCollapseButton(openDetails.value, openDetails.onToggle)}
        sx={{ mb: 3 }}
      />

      <Collapse in={openDetails.value}>
        <Divider />

        <Stack spacing={3} sx={{ p: 3 }}>
          <Field.Text 
            name="name" 
            label="ชื่อหลักสูตร (เต็ม)"
            placeholder="เช่น หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์ พ.ศ. 2567"
          />

          <Field.Text 
            name="shortName" 
            label="ชื่อย่อ"
            placeholder="เช่น วิทยาการคอมพิวเตอร์ 67"
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            <Field.Text 
              name="year" 
              label="ปี พ.ศ."
              type="number"
            />
            
            <Field.Text 
              name="academicYear" 
              label="ปีการศึกษา (ไม่บังคับ)"
              type="number"
            />
            
            <Field.Text 
              name="version" 
              label="เวอร์ชัน"
              placeholder="เช่น 1.0"
            />
          </Box>
        </Stack>
      </Collapse>
    </Card>
  );

  const renderAcademic = () => (
    <Card>
      <CardHeader
        title="ข้อมูลทางวิชาการ"
        subheader="หลักสูตรหลัก สาขาวิชา และหน่วยกิต"
        action={renderCollapseButton(openAcademic.value, openAcademic.onToggle)}
        sx={{ mb: 3 }}
      />

      <Collapse in={openAcademic.value}>
        <Divider />

        <Stack spacing={3} sx={{ p: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            {/* <Field.Select name="programId" label="หลักสูตรหลัก" disabled>
              <MenuItem value="">เลือกหลักสูตร</MenuItem>
              {MOCK_PROGRAMS.map((program) => (
                <MenuItem key={program.id} value={program.id}>
                  {program.name}
                </MenuItem>
              ))}
            </Field.Select> */}

            <Field.Select name="majorId" label="สาขาวิชา" disabled={majorsLoading}>
              <MenuItem value="">เลือกสาขาวิชา</MenuItem>
              {majorsLoading ? (
                <MenuItem disabled>กำลังโหลด...</MenuItem>
              ) : (
                availableMajors.map((major) => (
                  <MenuItem key={major.id} value={major.id}>
                    {major.name}
                  </MenuItem>
                ))
              )}
            </Field.Select>
          </Box>

          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            หน่วยกิต
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            <Field.Text 
              name="totalCredits" 
              label="หน่วยกิตรวม"
              type="number"
              inputProps={{ min: 0 }}
            />
            
            <Box /> 
            
            <Field.Text 
              name="coreCredits" 
              label="หน่วยกิตแกน"
              type="number"
              inputProps={{ min: 0 }}
            />
            
            <Field.Text 
              name="electiveCredits" 
              label="หน่วยกิตเลือก"
              type="number"
              inputProps={{ min: 0 }}
            />
            
            <Field.Text 
              name="generalCredits" 
              label="หน่วยกิตศึกษาทั่วไป"
              type="number"
              inputProps={{ min: 0 }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ผลรวม: {(values.coreCredits || 0) + (values.electiveCredits || 0) + (values.generalCredits || 0)} / {values.totalCredits || 0} หน่วยกิต
              </Typography>
            </Box>
          </Box>

          <Field.Text 
            name="description" 
            label="คำอธิบายหลักสูตร"
            placeholder="รายละเอียดโดยย่อของหลักสูตร"
            multiline
            rows={3}
          />
        </Stack>
      </Collapse>
    </Card>
  );

  const renderProperties = () => (
    <Card>
      <CardHeader
        title="คุณสมบัติเพิ่มเติม"
        subheader="วันที่เริ่มต้น-สิ้นสุด และสถานะ"
        action={renderCollapseButton(openProperties.value, openProperties.onToggle)}
        sx={{ mb: 3 }}
      />

      <Collapse in={openProperties.value}>
        <Divider />

        <Stack spacing={3} sx={{ p: 3 }}>
          {/* <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            <Field.DatePicker 
              name="startDate" 
              label="วันที่เริ่มต้น (ไม่บังคับ)"
            />
            
            <Field.DatePicker 
              name="endDate" 
              label="วันที่สิ้นสุด (ไม่บังคับ)"
            />
          </Box> */}

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                รูปหน้าปก
              </Typography>
              <Upload
                value={file}
                accept={{ 'image/*': [] }}
                onDrop={handleDropSingleFile}
                onDelete={() => setFile(null)}
                helperText="รองรับไฟล์ภาพ .jpg, .png, .webp"
              />
            </Box>

            <Field.Text name="introVideo" label="วิดีโอแนะนำ (URL)" />
          </Box>

          <FormControlLabel
            control={<Switch checked={!!values.isActive} onChange={(_, c) => setValue('isActive', c)} />}
            label="ใช้งานอยู่"
          />

          <Field.Select name="status" label="สถานะ">
            <MenuItem value="DRAFT">ร่าง</MenuItem>
            <MenuItem value="ACTIVE">ใช้งาน</MenuItem>
            <MenuItem value="INACTIVE">ไม่ใช้งาน</MenuItem>
          </Field.Select>

          {values.status === 'ACTIVE' && (
            <Box sx={{ p: 2, bgcolor: 'success.lighter', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: 'success.dark' }}>
                <strong>หมายเหตุ:</strong> หลักสูตรที่มีสถานะ "ใช้งาน" จะสามารถนำไปใช้ในการลงทะเบียนของนักศึกษาได้
              </Typography>
            </Box>
          )}
        </Stack>
      </Collapse>
    </Card>
  );

  const renderActions = () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
      }}
    >
      <Button 
        color="inherit" 
        variant="outlined" 
        size="large" 
        onClick={() => router.push(paths.dashboard.curriculum.list)}
      >
        ยกเลิก
      </Button>

      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      >
        {!currentCurriculum ? 'สร้างหลักสูตร' : 'บันทึกการแก้ไข'}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails()}
        {renderAcademic()}
        {renderProperties()}
        {renderActions()}
      </Stack>
    </Form>
  );
} 