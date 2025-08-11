import { CONFIG } from 'src/global-config';

import { InstructorListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = { title: `อาจารย์/ผู้สอน | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <InstructorListView />;
} 