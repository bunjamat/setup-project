import { CONFIG } from 'src/global-config';

import { InstructorEditView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = { title: `แก้ไขข้อมูลอาจารย์ | Dashboard - ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { id } = await params;

  return <InstructorEditView instructorId={id} />;
}

// ----------------------------------------------------------------------

/**
 * Static Exports in Next.js
 *
 * 1. Set `isStaticExport = true` in `next.config.{mjs|ts}`.
 * 2. This allows `generateStaticParams()` to pre-render dynamic routes at build time.
 *
 * For more details, see:
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 *
 * NOTE: Remove all "generateStaticParams()" functions if not using static exports.
 */
// export async function generateStaticParams() {
//   // TODO: Fetch instructor IDs from API when static export is enabled
//   // For now, return empty array to generate pages dynamically
//   if (CONFIG.isStaticExport) {
//     try {
//       // This would be replaced with actual API call
//       const instructors = [
//         { id: '1' },
//         { id: '2' },
//         { id: '3' },
//       ];

//       return instructors.map((instructor) => ({
//         id: instructor.id,
//       }));
//     } catch (error) {
//       console.error('Failed to fetch instructors for static generation:', error);
//       return [];
//     }
//   }

//   return [];
// } 