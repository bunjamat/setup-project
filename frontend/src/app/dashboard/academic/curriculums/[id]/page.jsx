import { CONFIG } from 'src/global-config';

import { CurriculumDetailsView } from 'src/sections/curriculum/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Curriculum details | Dashboard - ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { id } = await params;

  return <CurriculumDetailsView id={id} />;
}
