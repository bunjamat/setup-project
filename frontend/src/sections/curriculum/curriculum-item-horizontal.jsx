import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';
import { Image } from 'src/components/image';
import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export function CurriculumItemHorizontal({ sx, curriculum, editHref, detailsHref, ...other }) {
  const menuActions = usePopover();

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'bottom-center' } }}
    >
      <MenuList>
        <li>
          <MenuItem component={RouterLink} href={detailsHref} onClick={() => menuActions.onClose()}>
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>
        </li>

        <li>
          <MenuItem component={RouterLink} href={editHref} onClick={() => menuActions.onClose()}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </li>

        <MenuItem 
          onClick={() => {
            menuActions.onClose();
            // Handle delete action here if needed
          }} 
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'warning';
      case 'archived':
        return 'error';
      case 'draft':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Card sx={[...(Array.isArray(sx) ? sx : [sx])]} {...other}>
        <Box sx={{ position: 'relative' }}>
          <Image
            src={`${CONFIG.serverUrl}${curriculum.coverImage}`}
            alt={curriculum.name}
            ratio="16/9"
            sx={{ borderRadius: 0 }}
          />
        </Box>
        <Stack
          spacing={1}
          sx={[
            (theme) => ({
              flexGrow: 1,
              p: theme.spacing(3, 3, 2, 3),
            }),
          ]}
        >
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Label variant="soft" color={getStatusColor(curriculum.status)}>
              {curriculum.status}
            </Label>

            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              {curriculum.version}
            </Box>
          </Box>

          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <Link
              component={RouterLink}
              href={detailsHref}
              color="inherit"
              variant="h5"
              sx={[
                (theme) => ({
                  ...theme.mixins.maxLine({ line: 2 }),
                }),
              ]}
            >
              {curriculum.name}
            </Link>
{/* 
            <Typography
              variant="body2"
              sx={[
                (theme) => ({
                  ...theme.mixins.maxLine({ line: 1 }),
                  color: 'text.secondary',
                }),
              ]}
            >
              {curriculum.nameEn}
            </Typography> */}

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              <Chip 
                size="small" 
                label={curriculum.major?.department?.name || curriculum.major?.department} 
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
              <Chip 
                size="small" 
                label={curriculum.major?.name || curriculum.major} 
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            </Box>
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color={menuActions.open ? 'inherit' : 'default'}
              onClick={menuActions.onOpen}
            >
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>

            <Box
              sx={{
                gap: 1.5,
                flexGrow: 1,
                display: 'flex',
                flexWrap: 'wrap',
                typography: 'caption',
                color: 'text.disabled',
                justifyContent: 'flex-end',
              }}
            >
              <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
                <Iconify icon="solar:calendar-bold" width={16} />
                {curriculum.academicYear}
              </Box>

              <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
                <Iconify icon="solar:bookmark-bold" width={16} />
                {curriculum.totalCredits} หน่วยกิต
              </Box>

              <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
                <Iconify icon="solar:users-group-rounded-bold" width={16} />
                {curriculum.totalStudents || 0} คน
              </Box>
            </Box>
          </Box>
        </Stack>
      </Card>

      {renderMenuActions()}
    </>
  );
}
