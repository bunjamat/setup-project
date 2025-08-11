import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { varAlpha } from 'minimal-shared/utils';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function CurriculumTableFiltersResult({
  filters,
  totalResults,
  onResetPage,
  sx,
  ...other
}) {
  const { state: currentFilters, setState: updateFilters } = filters;

  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    updateFilters({ search: '' });
  }, [onResetPage, updateFilters]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    updateFilters({ status: 'all' });
  }, [onResetPage, updateFilters]);

  const handleRemoveFaculty = useCallback(() => {
    onResetPage();
    updateFilters({ facultyId: 'all', majorId: 'all' }); // Reset major when removing faculty
  }, [onResetPage, updateFilters]);

  const handleRemoveMajor = useCallback(() => {
    onResetPage();
    updateFilters({ majorId: 'all' });
  }, [onResetPage, updateFilters]);

  const handleReset = useCallback(() => {
    onResetPage();
    updateFilters({
      search: '',
      status: 'all',
      facultyId: 'all',
      majorId: 'all',
    });
  }, [onResetPage, updateFilters]);

  return (
    <Stack spacing={1.5} sx={sx} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{totalResults}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
          results found
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {!!currentFilters.search && (
          <Block label="Keyword:">
            <Chip
              size="small"
              label={currentFilters.search}
              onDelete={handleRemoveKeyword}
            />
          </Block>
        )}

        {currentFilters.status !== 'all' && (
          <Block label="Status:">
            <Chip
              size="small"
              label={currentFilters.status}
              onDelete={handleRemoveStatus}
            />
          </Block>
        )}

        {currentFilters.facultyId !== 'all' && (
          <Block label="Faculty:">
            <Chip
              size="small"
              label={currentFilters.facultyId}
              onDelete={handleRemoveFaculty}
            />
          </Block>
        )}

        {currentFilters.majorId !== 'all' && (
          <Block label="Major:">
            <Chip
              size="small"
              label={currentFilters.majorId}
              onDelete={handleRemoveMajor}
            />
          </Block>
        )}

        <Button
          color="error"
          onClick={handleReset}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Block({ label, children, sx, ...other }) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}