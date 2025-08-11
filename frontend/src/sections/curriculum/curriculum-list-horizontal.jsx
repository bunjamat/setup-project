import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';

import { CurriculumItemSkeleton } from './curriculum-skeleton';
import { CurriculumItemHorizontal } from './curriculum-item-horizontal';

// ----------------------------------------------------------------------

export function CurriculumListHorizontal({ curriculums, loading, pagination, onPageChange }) {
  const renderLoading = () => <CurriculumItemSkeleton variant="horizontal" />;

  const renderList = () =>
    curriculums.map((curriculum) => (
      <CurriculumItemHorizontal
        key={curriculum.id}
        curriculum={curriculum}
        detailsHref={paths.dashboard.curriculum.details(curriculum.id)}
        editHref={paths.dashboard.curriculum.edit(curriculum.id)}
      />
    ));

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
        }}
      >
        {loading ? renderLoading() : renderList()}
      </Box>

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          count={pagination.totalPages}
          page={pagination.currentPage}
          onChange={(event, page) => onPageChange(page)}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}