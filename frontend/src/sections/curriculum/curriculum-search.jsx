import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function CurriculumSearch({ onSearch, sx, ...other }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    (inputValue) => {
      if (onSearch) {
        onSearch(inputValue);
      }
    },
    [onSearch]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleSearch(searchQuery);
      }
    },
    [handleSearch, searchQuery]
  );

  return (
    <Box
      sx={[
        (theme) => ({
          width: 1,
          maxWidth: 320,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'background.neutral',
          border: `solid 1px ${theme.vars.palette.divider}`,
          borderRadius: 1,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <InputBase
        fullWidth
        value={searchQuery}
        onKeyDown={handleKeyDown}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search curriculum..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
        sx={{ px: 1, height: 40 }}
      />
    </Box>
  );
}