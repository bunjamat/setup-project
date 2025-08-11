import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { stackClasses } from '@mui/material/Stack';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SubjectTableFiltersResult({
  filters,
  onResetPage,
  onFilters,
  totalResults,
  sx,
  ...other
}) {
  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    onFilters('name', '');
  }, [onFilters, onResetPage]);

  const handleRemoveSubjectType = useCallback(() => {
    onResetPage();
    onFilters('subjectType', '');
  }, [onFilters, onResetPage]);

  const handleRemoveDifficulty = useCallback(() => {
    onResetPage();
    onFilters('difficulty', '');
  }, [onFilters, onResetPage]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    onFilters('status', '');
  }, [onFilters, onResetPage]);

  const handleReset = useCallback(() => {
    onResetPage();
    onFilters('name', '');
    onFilters('subjectType', '');
    onFilters('difficulty', '');
    onFilters('status', '');
  }, [onFilters, onResetPage]);

  return (
    <Stack spacing={1.5} sx={{ ...sx }}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{totalResults}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          results found
        </Box>
      </Box>

      <Stack
        flexGrow={1}
        spacing={1}
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        sx={{ [`& .${stackClasses.root}`]: { minWidth: 0 } }}
      >
        {!!filters.name && (
          <Block label="Keyword:">
            <Chip size="small" label={filters.name} onDelete={handleRemoveKeyword} />
          </Block>
        )}

        {!!filters.subjectType && (
          <Block label="Type:">
            <Chip size="small" label={filters.subjectType} onDelete={handleRemoveSubjectType} />
          </Block>
        )}

        {!!filters.difficulty && (
          <Block label="Difficulty:">
            <Chip size="small" label={filters.difficulty} onDelete={handleRemoveDifficulty} />
          </Block>
        )}

        {!!filters.status && (
          <Block label="Status:">
            <Chip size="small" label={filters.status} onDelete={handleRemoveStatus} />
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
      sx={{ px: 1, py: 0.5, borderRadius: 1, bgcolor: 'unset', ...sx }}
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