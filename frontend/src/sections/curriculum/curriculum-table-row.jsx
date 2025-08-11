import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'minimal-shared/hooks';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';
import { usePopover } from 'minimal-shared';

// ----------------------------------------------------------------------

export function CurriculumTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
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
          <Typography variant="body2" sx={{ fontWeight: 'fontWeightMedium' }}>
            {row.code}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Stack spacing={0.5}>
          <Typography variant="body2" noWrap sx={{ fontWeight: 'fontWeightMedium' }}>
            {row.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
            {row.nameEn}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant="body2" noWrap>
          {row.faculty}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2" noWrap>
          {row.major}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2">
          {row.academicYear}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Chip
          size="small"
          variant="soft"
          label={row.version}
          color={row.isDefault ? 'primary' : 'default'}
        />
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2">
          {row.totalCredits}
        </Typography>
      </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (row.status === 'active' && 'success') ||
            (row.status === 'inactive' && 'warning') ||
            (row.status === 'archived' && 'error') ||
            (row.status === 'draft' && 'info') ||
            'default'
          }
        >
          {row.status}
        </Label>
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2">
          {row.totalStudents}
        </Typography>
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
        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

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
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}