import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------
const iconPath = (name) => `${CONFIG.assetsDir}/assets/icons/solid-64/${name}`;

const CORE_VALUES = [
  {
    title: 'Customer satisfaction',
    description: 'Aenean urna dictum adipiscing nec, cras quisque.',
    icon: iconPath('ic-satisfaction.svg'),
  },
  {
    title: 'Transparency',
    description: 'Aenean urna dictum adipiscing nec, cras quisque.',
    icon: iconPath('ic-transparency.svg'),
  },
  {
    title: 'Reputation',
    description: 'Aenean urna dictum adipiscing nec, cras quisque.',
    icon: iconPath('ic-popularity.svg'),
  },
  {
    title: 'Cooperation',
    description: 'Aenean urna dictum adipiscing nec, cras quisque.',
    icon: iconPath('ic-cooperate.svg'),
  },
];
export function ElearningAboutHero({ sx, ...other }) {
  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(to bottom, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)}, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)})`,
              `url(${CONFIG.assetsDir}/assets/background/overlay-1.webp)`,
            ],
          }),

          overflow: 'hidden',
          position: 'relative',
          py: { xs: 10, md: 20 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component="img"
        alt="Texture"
        src={`${CONFIG.assetsDir}/assets/background/texture-1.webp`}
        sx={{
          top: 0,
          right: 0,
          zIndex: 8,
          opacity: 0.24,
          position: 'absolute',
          height: `calc(100% + 80px)`,
        }}
      />
      <Container sx={{ position: 'relative', zIndex: 9 }}>
        <Grid
          container
          spacing={{ xs: 5, md: 3 }}
          sx={{ justifyContent: 'space-between', textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <Box
              component="img"
              alt="Courses online"
              src={`${CONFIG.assetsDir}/assets/illustrations/illustration-courses-hero.svg`}
            />
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              color: 'grey.800',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
            size={{ xs: 12, md: 6, lg: 5 }}
          >
            <Typography variant="h2" typography={'h1'}>คลังหน่วยกิต หลักสูตรออนไลน์</Typography>

            <Typography sx={{ mt: 3, mb: 6, maxWidth: 480 }}>
            ระบบคลังหน่วยกิตนี้ พัฒนาขึ้นโดยอาจารย์และบุคลากรภายในมหาวิทยาลัยราชภัฏมหาสารคาม เพื่อให้นักศึกษาสามารถเข้าถึงข้อมูลหลักสูตร วิชาที่เปิดสอน และพัฒนาการเรียนรู้อย่างเป็นระบบและยืดหยุ่นตามความถนัดของแต่ละคน
            </Typography>

            <Button variant="contained" size="large" color="primary">
              Browse courses
            </Button>
          </Grid>

          
        </Grid>
        <Box
          sx={{
            display: 'grid',
            mt: 6,
            gap: { xs: 5, md: 8 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {CORE_VALUES.map((item) => (
            <Box key={item.title} sx={{ textAlign: { xs: 'center', md: 'unset' } ,}}>
              <SvgColor
                src={item.icon}
                sx={(theme) => ({
                  background: `linear-gradient(to bottom, ${theme.vars.palette.primary.light}, ${theme.vars.palette.primary.main})`,
                  width: 64,
                  height: 64,
                })}
              />

              <Typography component="h6" variant="h5" sx={{ mt: 3, mb: 1 }}>
                {item.title}
              </Typography>

              <Typography sx={{ color: 'text.secondary' }}> {item.description} </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
