import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';

import { subjectApi } from 'src/actions/subject';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'minimal-shared';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewSubjectSchema = zod.object({
  code: zod.string().min(1, { message: 'กรุณากรอกรหัสวิชา!' }),
  title: zod.string().min(1, { message: 'กรุณากรอกชื่อวิชา!' }),
  titleEn: zod.string().optional(),
  description: zod.string().optional(),
  majorId: zod.number().min(1, { message: 'กรุณาเลือกสาขาวิชา!' }),
  curriculumIds: zod.array(zod.number()).optional(),
  credits: zod.number().min(1).max(12, { message: 'หน่วยกิตต้องอยู่ระหว่าง 1-12' }),
  theoryHours: zod.number().min(0),
  practiceHours: zod.number().min(0),
  selfStudyHours: zod.number().min(0),
  level: zod.number().min(1).max(4).default(1),
  subjectType: zod.enum(['CORE', 'ELECTIVE', 'GENERAL_EDUCATION', 'PROFESSIONAL']),
  accessLevel: zod.enum(['PUBLIC', 'RESTRICTED', 'PRIVATE']),
  difficulty: zod.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  isFree: zod.boolean().default(true),
  price: zod.number().optional(),
  learningObjectives: zod.array(zod.string()).default([]),
  skillsAcquired: zod.array(zod.string()).default([]),
  prerequisites: zod.string().optional(),
  targetAudience: zod.string().optional(),
  coverImage: schemaHelper.file({ message: { required_error: 'กรุณาอัปโหลดรูปภาพปก!' } }),
  introVideo: zod.string().optional(),
  allowAllLessons: zod.boolean().default(true),
});

// ----------------------------------------------------------------------

export function SubjectNewEditForm({ currentSubject, majors = [], curriculums = [] }) {
  const router = useRouter();

  const loadingSave = useBoolean();
  const loadingSend = useBoolean();

  const defaultValues = useMemo(
    () => ({
      code: currentSubject?.code || '',
      title: currentSubject?.title || '',
      titleEn: currentSubject?.titleEn || '',
      description: currentSubject?.description || '',
      majorId: currentSubject?.majorId || 0,
      curriculumIds: currentSubject?.curriculumIds || [],
      credits: currentSubject?.credits || 3,
      theoryHours: currentSubject?.theoryHours || 0,
      practiceHours: currentSubject?.practiceHours || 0,
      selfStudyHours: currentSubject?.selfStudyHours || 0,
      level: currentSubject?.level || 1,
      subjectType: currentSubject?.subjectType || 'CORE',
      accessLevel: currentSubject?.accessLevel || 'PUBLIC',
      difficulty: currentSubject?.difficulty || 'BEGINNER',
      isFree: currentSubject?.isFree ?? true,
      price: currentSubject?.price || 0,
      learningObjectives: currentSubject?.learningObjectives || [],
      skillsAcquired: currentSubject?.skillsAcquired || [],
      prerequisites: currentSubject?.prerequisites || '',
      targetAudience: currentSubject?.targetAudience || '',
      coverImage: currentSubject?.coverImage || null,
      introVideo: currentSubject?.introVideo || '',
      allowAllLessons: currentSubject?.allowAllLessons ?? true,
    }),
    [currentSubject]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewSubjectSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentSubject) {
      reset(defaultValues);
    }
  }, [currentSubject, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    loadingSave.onTrue();

    try {
      let result;

      if (currentSubject) {
        result = await subjectApi.updateSubject(currentSubject.id, data);
      } else {
        result = await subjectApi.createSubject(data);
      }

      if (result.success) {
        toast.success(
          currentSubject ? 'อัปเดตวิชาสำเร็จ!' : 'สร้างวิชาสำเร็จ!'
        );
        router.push(paths.dashboard.subject.root);
      } else {
        toast.error(result.message || 'เกิดข้อผิดพลาด!');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'เกิดข้อผิดพลาด!');
    } finally {
      loadingSave.onFalse();
    }
  });

  const handleAddObjective = useCallback(() => {
    const currentObjectives = values.learningObjectives || [];
    setValue('learningObjectives', [...currentObjectives, '']);
  }, [setValue, values.learningObjectives]);

  const handleRemoveObjective = useCallback(
    (index) => {
      const currentObjectives = values.learningObjectives || [];
      setValue(
        'learningObjectives',
        currentObjectives.filter((_, i) => i !== index)
      );
    },
    [setValue, values.learningObjectives]
  );

  const handleAddSkill = useCallback(() => {
    const currentSkills = values.skillsAcquired || [];
    setValue('skillsAcquired', [...currentSkills, '']);
  }, [setValue, values.skillsAcquired]);

  const handleRemoveSkill = useCallback(
    (index) => {
      const currentSkills = values.skillsAcquired || [];
      setValue(
        'skillsAcquired',
        currentSkills.filter((_, i) => i !== index)
      );
    },
    [setValue, values.skillsAcquired]
  );

  const renderDetails = (
    <Card>
      <CardHeader
        title="รายละเอียดวิชา"
        subheader="ข้อมูลพื้นฐานของวิชา"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Text name="code" label="รหัสวิชา" placeholder="เช่น CS101" />
          <Field.Text
            name="title"
            label="ชื่อวิชา"
            placeholder="เช่น การเขียนโปรแกรมเบื้องต้น"
          />
        </Box>

        <Field.Text name="titleEn" label="ชื่อภาษาอังกฤษ (ไม่บังคับ)" placeholder="ชื่อภาษาอังกฤษ" />

        <Field.Text
          name="description"
          label="คำอธิบาย"
          multiline
          rows={4}
          placeholder="คำอธิบายวิชา..."
        />

        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Select name="majorId" label="สาขาวิชา" placeholder="เลือกสาขาวิชา">
            <MenuItem value="">เลือกสาขาวิชา</MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            {majors.map((major) => (
              <MenuItem key={major.id} value={major.id}>
                {major.name}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.MultiSelect
            name="curriculumIds"
            label="หลักสูตร (ไม่บังคับ)"
            options={curriculums.map((curriculum) => ({
              value: curriculum.id,
              label: curriculum.name,
            }))}
          />
        </Box>
      </Stack>
    </Card>
  );

  const renderCredits = (
    <Card>
      <CardHeader
        title="ข้อมูลหน่วยกิต"
        subheader="หน่วยกิตและเวลาการศึกษา"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
        >
          <Field.Text
            name="credits"
            label="หน่วยกิต"
            type="number"
            inputProps={{ min: 1, max: 12 }}
          />
          <Field.Text
            name="theoryHours"
            label="ชั่วโมงทฤษฎี"
            type="number"
            inputProps={{ min: 0 }}
          />
          <Field.Text
            name="practiceHours"
            label="ชั่วโมงปฏิบัติ"
            type="number"
            inputProps={{ min: 0 }}
          />
          <Field.Text
            name="selfStudyHours"
            label="ชั่วโมงศึกษาด้วยตนเอง"
            type="number"
            inputProps={{ min: 0 }}
          />
        </Box>

        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        >
          <Field.Select name="level" label="ระดับ" type="number">
            <MenuItem value="">เลือกระดับ</MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem value={1}>ระดับ 1</MenuItem>
            <MenuItem value={2}>ระดับ 2</MenuItem>
            <MenuItem value={3}>ระดับ 3</MenuItem>
            <MenuItem value={4}>ระดับ 4</MenuItem>
          </Field.Select>

          <Field.Select name="subjectType" label="ประเภทวิชา">
            <MenuItem value="">เลือกประเภทวิชา</MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem value="CORE">วิชาบังคับ</MenuItem>
            <MenuItem value="ELECTIVE">วิชาเลือก</MenuItem>
            <MenuItem value="GENERAL_EDUCATION">วิชาการศึกษาทั่วไป</MenuItem>
            <MenuItem value="PROFESSIONAL">วิชาชีพ</MenuItem>
          </Field.Select>

          <Field.Select name="difficulty" label="ระดับความยาก">
            <MenuItem value="">เลือกระดับความยาก</MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem value="BEGINNER">ระดับเริ่มต้น</MenuItem>
            <MenuItem value="INTERMEDIATE">ระดับกลาง</MenuItem>
            <MenuItem value="ADVANCED">ระดับสูง</MenuItem>
          </Field.Select>
        </Box>
      </Stack>
    </Card>
  );

  const renderAccess = (
    <Card>
      <CardHeader
        title="การเข้าถึงและราคา"
        subheader="ระดับการเข้าถึงและข้อมูลราคา"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Select name="accessLevel" label="ระดับการเข้าถึง">
          <MenuItem value="">เลือกระดับการเข้าถึง</MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem value="PUBLIC">สาธารณะ</MenuItem>
          <MenuItem value="RESTRICTED">จำกัด</MenuItem>
          <MenuItem value="PRIVATE">ส่วนตัว</MenuItem>
        </Field.Select>

        <FormControlLabel
          control={<Field.Switch name="isFree" />}
          label="วิชาฟรี"
          labelPlacement="start"
          sx={{ ml: 0, width: 1, justifyContent: 'space-between' }}
        />

        {!values.isFree && (
          <Field.Text
            name="price"
            label="ราคา (บาท)"
            type="number"
            inputProps={{ min: 0 }}
            placeholder="0.00"
          />
        )}

        <FormControlLabel
          control={<Field.Switch name="allowAllLessons" />}
          label="อนุญาตเข้าถึงบทเรียนทั้งหมด"
          labelPlacement="start"
          sx={{ ml: 0, width: 1, justifyContent: 'space-between' }}
        />
      </Stack>
    </Card>
  );

  const renderObjectives = (
    <Card>
      <CardHeader title="วัตถุประสงค์การเรียนรู้" subheader="สิ่งที่นักเรียนจะได้เรียนรู้" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        {values.learningObjectives?.map((objective, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1}>
            <Field.Text
              name={`learningObjectives.${index}`}
              label={`วัตถุประสงค์ที่ ${index + 1}`}
              placeholder="วัตถุประสงค์การเรียนรู้..."
              sx={{ flex: 1 }}
            />
            <Button
              size="small"
              color="error"
              onClick={() => handleRemoveObjective(index)}
              sx={{ minWidth: 'auto', px: 1 }}
            >
              ลบ
            </Button>
          </Box>
        ))}

        <Button
          size="small"
          color="primary"
          startIcon={<span>+</span>}
          onClick={handleAddObjective}
          sx={{ alignSelf: 'flex-start' }}
        >
          เพิ่มวัตถุประสงค์
        </Button>
      </Stack>
    </Card>
  );

  const renderSkills = (
    <Card>
      <CardHeader title="ทักษะที่ได้รับ" subheader="ทักษะที่นักเรียนจะได้รับ" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        {values.skillsAcquired?.map((skill, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1}>
            <Field.Text
              name={`skillsAcquired.${index}`}
              label={`ทักษะที่ ${index + 1}`}
              placeholder="ทักษะที่ได้รับ..."
              sx={{ flex: 1 }}
            />
            <Button
              size="small"
              color="error"
              onClick={() => handleRemoveSkill(index)}
              sx={{ minWidth: 'auto', px: 1 }}
            >
              ลบ
            </Button>
          </Box>
        ))}

        <Button
          size="small"
          color="primary"
          startIcon={<span>+</span>}
          onClick={handleAddSkill}
          sx={{ alignSelf: 'flex-start' }}
        >
          เพิ่มทักษะ
        </Button>
      </Stack>
    </Card>
  );

  const renderAdditional = (
    <Card>
      <CardHeader
        title="ข้อมูลเพิ่มเติม"
        subheader="ข้อกำหนดเบื้องต้นและกลุ่มเป้าหมาย"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="prerequisites"
          label="ข้อกำหนดเบื้องต้น"
          multiline
          rows={3}
          placeholder="ข้อกำหนดเบื้องต้นสำหรับวิชานี้..."
        />

        <Field.Text
          name="targetAudience"
          label="กลุ่มเป้าหมาย"
          multiline
          rows={3}
          placeholder="ใครควรเรียนวิชานี้..."
        />
      </Stack>
    </Card>
  );

  const renderMedia = (
    <Card>
      <CardHeader title="สื่อ" subheader="รูปภาพปกและวิดีโอแนะนำ" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Upload name="coverImage" label="รูปภาพปก" />

        <Field.Text
          name="introVideo"
          label="URL วิดีโอแนะนำ"
          placeholder="https://youtube.com/watch?v=..."
        />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={loadingSave.value && isSubmitting}
        sx={{ ml: 'auto' }}
      >
        {currentSubject ? 'อัปเดตวิชา' : 'สร้างวิชา'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5}>
        {renderDetails}
        {renderCredits}
        {renderAccess}
        {renderObjectives}
        {renderSkills}
        {renderAdditional}
        {renderMedia}
        {renderActions}
      </Stack>
    </Form>
  );
}
