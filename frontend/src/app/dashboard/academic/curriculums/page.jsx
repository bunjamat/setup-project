import { CONFIG } from 'src/global-config';

import { CurriculumListView } from 'src/sections/curriculum/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Curriculum list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CurriculumListView />;
} 