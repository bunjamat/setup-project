import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { usePopover } from 'minimal-shared';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SubjectTableToolbar({
  filters,
  onResetPage,
  numSelected,
  onFilters,
  onDeleteRows,
}) {
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      onFilters('name', event.target.value);
    },
    [onFilters, onResetPage]
  );

  const handleFilterSubjectType = useCallback(
    (event) => {
      onResetPage();
      onFilters('subjectType', event.target.value);
    },
    [onFilters, onResetPage]
  );

  const handleFilterDifficulty = useCallback(
    (event) => {
      onResetPage();
      onFilters('difficulty', event.target.value);
    },
    [onFilters, onResetPage]
  );

  const handleFilterStatus = useCallback(
    (event) => {
      onResetPage();
      onFilters('status', event.target.value);
    },
    [onFilters, onResetPage]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 2.5,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          <TextField
            fullWidth
            value={filters.name}
            onChange={handleFilterName}
            placeholder="Search subjects..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            select
            label="Subject Type"
            value={filters.subjectType}
            onChange={handleFilterSubjectType}
            SelectProps={{ native: true }}
          >
            <option value="">All Types</option>
            <option value="CORE">Core</option>
            <option value="ELECTIVE">Elective</option>
            <option value="GENERAL_EDUCATION">General Education</option>
            <option value="PROFESSIONAL">Professional</option>
          </TextField>

          <TextField
            fullWidth
            select
            label="Difficulty"
            value={filters.difficulty}
            onChange={handleFilterDifficulty}
            SelectProps={{ native: true }}
          >
            <option value="">All Levels</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </TextField>

          <TextField
            fullWidth
            select
            label="Status"
            value={filters.status}
            onChange={handleFilterStatus}
            SelectProps={{ native: true }}
          >
            <option value="">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="ARCHIVED">Archived</option>
          </TextField>
        </Box>

        <Stack direction="row" alignItems="center" spacing={1} flexShrink={0}>
          <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      {numSelected > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            pl: 1,
            pr: 2,
            top: 0,
            left: 0,
            width: 1,
            zIndex: 9,
            height: 58,
            position: 'absolute',
            bgcolor: 'primary.lighter',
          }}
        >
          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
            {numSelected} selected
          </Typography>

          <Button
            size="small"
            color="error"
            variant="contained"
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            onClick={onDeleteRows}
            sx={{ mr: 1 }}
          >
            Delete
          </Button>
        </Stack>
      )}
    </>
  );
}