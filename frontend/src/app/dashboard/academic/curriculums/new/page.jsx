import { CONFIG } from 'src/global-config';

import { CurriculumCreateView } from 'src/sections/curriculum/view';

// ----------------------------------------------------------------------

export const metadata = { title: `เพิ่มหลักสูตรใหม่ | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CurriculumCreateView />;
} 