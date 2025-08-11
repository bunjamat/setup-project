import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { useBoolean,usePopover } from 'minimal-shared';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';



// ----------------------------------------------------------------------

export function SubjectTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onActivateRow, onDeactivateRow }) {
  const confirm = useBoolean();
  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        />
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={row.title}
            src={row.coverImage}
            variant="rounded"
            sx={{ width: 64, height: 64, mr: 2 }}
          />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" noWrap>
              {row.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {row.code}
            </Typography>
            {row.titleEn && (
              <Typography variant="caption" sx={{ color: 'text.disabled' }} noWrap>
                {row.titleEn}
              </Typography>
            )}
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Box>
          <Typography variant="body2" noWrap>
            {row.major?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
            {row.major?.program?.name}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="center">
        <Typography variant="subtitle2">{row.credits}</Typography>
      </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (row.subjectType === 'CORE' && 'primary') ||
            (row.subjectType === 'ELECTIVE' && 'secondary') ||
            (row.subjectType === 'GENERAL_EDUCATION' && 'info') ||
            'default'
          }
        >
          {row.subjectType}
        </Label>
      </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (row.difficulty === 'BEGINNER' && 'success') ||
            (row.difficulty === 'INTERMEDIATE' && 'warning') ||
            (row.difficulty === 'ADVANCED' && 'error') ||
            'default'
          }
        >
          {row.difficulty}
        </Label>
      </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (row.accessLevel === 'PUBLIC' && 'success') ||
            (row.accessLevel === 'RESTRICTED' && 'warning') ||
            (row.accessLevel === 'PRIVATE' && 'error') ||
            'default'
          }
        >
          {row.accessLevel}
        </Label>
      </TableCell>

      <TableCell>
        {row.isFree ? (
          <Chip label="Free" color="success" size="small" />
        ) : (
          <Chip label={`฿${row.price}`} color="primary" size="small" />
        )}
      </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (row.status === 'ACTIVE' && 'success') ||
            (row.status === 'INACTIVE' && 'warning') ||
            (row.status === 'DRAFT' && 'default') ||
            (row.status === 'ARCHIVED' && 'error') ||
            'default'
          }
        >
          {row.status}
        </Label>
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2">{row.enrollmentCount || 0}</Typography>
      </TableCell>

      <TableCell align="right" sx={{ px: 1 }}>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          {row.status === 'INACTIVE' && (
            <MenuItem
              onClick={() => {
                onActivateRow();
                popover.onClose();
              }}
              sx={{ color: 'success.main' }}
            >
              <Iconify icon="eva:checkmark-circle-2-fill" />
              Activate
            </MenuItem>
          )}

          {row.status === 'ACTIVE' && (
            <MenuItem
              onClick={() => {
                onDeactivateRow();
                popover.onClose();
              }}
              sx={{ color: 'warning.main' }}
            >
              <Iconify icon="eva:clock-fill" />
              Deactivate
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete Subject"
        content={
          <>
            Are you sure you want to delete <strong>{row.title}</strong>?
            <br />
            This action cannot be undone.
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}