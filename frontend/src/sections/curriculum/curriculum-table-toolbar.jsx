import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { varAlpha } from 'minimal-shared/utils';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';
import { usePopover } from 'minimal-shared';

// ----------------------------------------------------------------------

export function CurriculumTableToolbar({ filters, onResetPage, options }) {
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ search: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterFaculty = useCallback(
    (event) => {
      const value = event.target.value;
      onResetPage();
      filters.setState({ 
        facultyId: value,
        majorId: 'all' // Reset major when faculty changes
      });
    },
    [filters, onResetPage]
  );

  const handleFilterMajor = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ majorId: event.target.value });
    },
    [filters, onResetPage]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5 }}
      >
        <Box
          sx={{
            width: { xs: 1, md: 240 },
          }}
        >
          <TextField
            fullWidth
            value={filters.state.search}
            onChange={handleFilterName}
            placeholder="ค้นหาหลักสูตร..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: 1, md: 200 },
          }}
        >
          <FormControl fullWidth>
            <InputLabel>คณะ</InputLabel>
            <Select
              value={filters.state.facultyId}
              onChange={handleFilterFaculty}
              input={<OutlinedInput label="คณะ" />}
            >
              <MenuItem value="all">ทั้งหมด</MenuItem>
              {options.faculties?.map((faculty) => (
                <MenuItem key={faculty.value} value={faculty.value}>
                  {faculty.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            width: { xs: 1, md: 200 },
          }}
        >
          <FormControl fullWidth>
            <InputLabel>สาขา</InputLabel>
            <Select
              value={filters.state.majorId}
              onChange={handleFilterMajor}
              input={<OutlinedInput label="สาขา" />}
              disabled={filters.state.facultyId === 'all'}
            >
              <MenuItem value="all">ทั้งหมด</MenuItem>
              {options.majors?.map((major) => (
                <MenuItem key={major.value} value={major.value}>
                  {major.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <IconButton onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:printer-minimalistic-bold" />
            Print
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:import-bold" />
            Import
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:export-bold" />
            Export
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}