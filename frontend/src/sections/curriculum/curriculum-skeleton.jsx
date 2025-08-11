import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

export function CurriculumItemSkeleton({ sx, itemCount = 16, variant = 'vertical', ...other }) {
  if (variant === 'horizontal') {
    return Array.from({ length: itemCount }, (_, index) => (
      <Box
        key={index}
        sx={[
          (theme) => ({
            display: 'flex',
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: `solid 1px ${theme.vars.palette.divider}`,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Box
          sx={{
            p: 3,
            gap: 2,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Skeleton variant="rounded" sx={{ width: 60, height: 20 }} />
            <Skeleton sx={{ width: 80, height: 12 }} />
          </Box>

          <Skeleton sx={{ width: 1, height: 16 }} />
          <Skeleton sx={{ width: `calc(100% - 40px)`, height: 12 }} />
          
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Skeleton variant="rounded" sx={{ width: 60, height: 20 }} />
            <Skeleton variant="rounded" sx={{ width: 80, height: 20 }} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
            <Skeleton variant="circular" sx={{ width: 32, height: 32 }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Skeleton sx={{ width: 60, height: 12 }} />
              <Skeleton sx={{ width: 60, height: 12 }} />
              <Skeleton sx={{ width: 60, height: 12 }} />
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 1, display: { xs: 'none', sm: 'block' } }}>
          <Skeleton sx={{ width: 170, height: 240, flexShrink: 0 }} />
        </Box>
      </Box>
    ));
  }

  return Array.from({ length: itemCount }, (_, index) => (
    <Box
      key={index}
      sx={[
        (theme) => ({
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: `solid 1px ${theme.vars.palette.divider}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Skeleton variant="rounded" sx={{ width: 60, height: 20 }} />
          <Skeleton sx={{ width: 80, height: 12 }} />
        </Box>

        <Skeleton sx={{ width: 1, height: 20, mb: 1 }} />
        <Skeleton sx={{ width: `calc(100% - 40px)`, height: 16, mb: 2 }} />
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Skeleton variant="rounded" sx={{ width: 60, height: 20 }} />
          <Skeleton variant="rounded" sx={{ width: 80, height: 20 }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Skeleton variant="circular" sx={{ width: 32, height: 32 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Skeleton sx={{ width: 60, height: 12 }} />
            <Skeleton sx={{ width: 60, height: 12 }} />
            <Skeleton sx={{ width: 60, height: 12 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  ));
}
