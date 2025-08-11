import { useCallback } from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';

import { usePopover } from 'minimal-shared/hooks';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function CurriculumSort({ sort, onSort, sortOptions, ...other }) {
  const popover = usePopover();

  const handleSort = useCallback(
    (newSort) => {
      onSort(newSort);
      popover.onClose();
    },
    [onSort, popover]
  );

  return (
    <>
      <ButtonBase
        disableRipple
        onClick={popover.onOpen}
        sx={[
          (theme) => ({
            pl: 1,
            py: 0.5,
            pr: 0.5,
            gap: 0.5,
            borderRadius: 1,
            typography: 'subtitle2',
            bgcolor: 'background.neutral',
            border: `solid 1px ${theme.vars.palette.divider}`,
          }),
        ]}
        {...other}
      >
        Sort by:
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
          {sortOptions.find((option) => option.value === sort)?.label}
        </Box>
        <Iconify
          icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
        />
      </ButtonBase>

      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sort}
            onClick={() => handleSort(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}