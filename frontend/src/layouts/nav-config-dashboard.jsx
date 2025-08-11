import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  // Main system icons
  dashboard: icon('ic-dashboard'),
  course: icon('ic-course'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  analytics: icon('ic-analytics'),

  // Course management icons
  booking: icon('ic-booking'),
  folder: icon('ic-folder'),
  calendar: icon('ic-calendar'),

  // Assessment icons
  label: icon('ic-label'),
  order: icon('ic-order'),

  // Communication icons
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),

  // Settings and admin
  lock: icon('ic-lock'),
  external: icon('ic-external'),

  // Additional icons
  banking: icon('ic-banking'),
  kanban: icon('ic-kanban'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  tour: icon('ic-tour'),
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  params: icon('ic-params'),
  blank: icon('ic-blank'),
  disabled: icon('ic-disabled'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
};

// ----------------------------------------------------------------------

/**
 * Navigation configuration for RMU Credit Bank System
 * Role-based navigation with complete access control
 */

// =================================================================
// STUDENT NAVIGATION (นักศึกษา)
// =================================================================
export const studentNavData = [
  /**
   * หน้าหลัก
   */
  {
    subheader: 'หน้าหลัก',
    items: [
      {
        title: 'ภาพรวมระบบ',
        path: paths.dashboard.student.dashboard,
        icon: ICONS.dashboard
      },
      {
        title: 'สถิติการเรียน',
        path: paths.dashboard.analytics,
        icon: ICONS.analytics
      },
    ],
  },

  /**
   * การลงทะเบียน
   */
  {
    subheader: 'การลงทะเบียน',
    items: [
      {
        title: 'ลงทะเบียนรายวิชา',
        path: paths.dashboard.student.registration.root,
        icon: ICONS.course,
        children: [
          { title: 'ค้นหารายวิชา', path: paths.dashboard.student.registration.courses },
          { title: 'ลงทะเบียนเรียน', path: paths.dashboard.student.registration.enroll },
          { title: 'ตารางเรียน', path: paths.dashboard.student.registration.schedule },
          { title: 'ประวัติการลงทะเบียน', path: paths.dashboard.student.registration.history },
        ],
      },
    ],
  },

  /**
   * การเรียนการสอน
   */
  {
    subheader: 'การเรียนการสอน',
    items: [
      {
        title: 'ตรวจสอบหน่วยกิต',
        path: paths.dashboard.student.credits.root,
        icon: ICONS.banking,
        children: [
          { title: 'สรุปหน่วยกิต', path: paths.dashboard.student.credits.summary },
          { title: 'โอนหน่วยกิต', path: paths.dashboard.student.credits.transfer },
          { title: 'คลังหน่วยกิต', path: paths.dashboard.student.credits.bank },
          { title: 'ตรวจสอบหน่วยกิต', path: paths.dashboard.student.credits.verification },
        ],
      },
      {
        title: 'ตรวจสอบหลักสูตรและแผนการเรียน',
        path: paths.dashboard.student.curriculum.root,
        icon: ICONS.kanban,
        children: [
          { title: 'แผนการเรียน', path: paths.dashboard.student.curriculum.plan },
          { title: 'ความก้าวหน้า', path: paths.dashboard.student.curriculum.progress },
          { title: 'ข้อกำหนดหลักสูตร', path: paths.dashboard.student.curriculum.requirements },
          { title: 'ปรึกษาอาจารย์', path: paths.dashboard.student.curriculum.advisor },
        ],
      },
      {
        title: 'เข้าร่วมพบเยี่ยมและฟ้าฟอน',
        path: paths.dashboard.student.learning.root,
        icon: ICONS.calendar,
        children: [
          { title: 'ตารางเรียนออนไลน์', path: paths.dashboard.student.learning.sessions },
          { title: 'ระบบจัดการเรียนรู้ LMS', path: paths.dashboard.student.learning.lms },
          { title: 'เอกสารประกอบการเรียน', path: paths.dashboard.student.learning.materials },
          { title: 'งานที่มอบหมาย', path: paths.dashboard.student.learning.assignments },
        ],
      },
    ],
  },

  /**
   * การประเมินผล
   */
  {
    subheader: 'การประเมินผล',
    items: [
      {
        title: 'ตรวจสอบผลการเรียน',
        path: paths.dashboard.student.academic.root,
        icon: ICONS.order,
        children: [
          { title: 'ผลการเรียน', path: paths.dashboard.student.academic.grades },
          { title: 'ใบแสดงผลการเรียน', path: paths.dashboard.student.academic.transcript },
          { title: 'เกรดเฉลี่ย (GPA)', path: paths.dashboard.student.academic.gpa },
          { title: 'การประเมินการเรียน', path: paths.dashboard.student.academic.evaluation },
        ],
      },
      {
        title: 'วินิจารณ์งานต้น',
        path: paths.dashboard.student.projects.root,
        icon: ICONS.label,
        children: [
          { title: 'ส่งงาน', path: paths.dashboard.student.projects.submission },
          { title: 'การบิวทํา', path: paths.dashboard.student.projects.review },
          { title: 'คอมเมนต์', path: paths.dashboard.student.projects.feedback },
        ],
      },
    ],
  },

  /**
   * จัดการข้อมูล
   */
  {
    subheader: 'จัดการข้อมูล',
    items: [
      {
        title: 'ข้อมูลส่วนตัว',
        path: paths.dashboard.student.profile.root,
        icon: ICONS.user,
        children: [
          { title: 'ข้อมูลส่วนตัว', path: paths.dashboard.student.profile.personal },
          { title: 'เอกสาร', path: paths.dashboard.student.profile.documents },
          { title: 'คำร้องต่างๆ', path: paths.dashboard.student.profile.requests },
        ],
      },
    ],
  },

  /**
   * การสื่อสาร
   */
  {
    subheader: 'การสื่อสาร',
    items: [
      {
        title: 'ข้อความ',
        path: paths.dashboard.messages.root,
        icon: ICONS.mail,
        children: [
          { title: 'กล่องขาเข้า', path: paths.dashboard.messages.inbox },
          { title: 'เขียนข้อความ', path: paths.dashboard.messages.compose },
        ],
      },
      { title: 'แชท', path: paths.dashboard.chat.root, icon: ICONS.chat },
      { title: 'ประกาศ', path: paths.dashboard.announcements.root, icon: ICONS.booking },
    ],
  },

  /**
   * ช่วยเหลือ
   */
  {
    subheader: 'ช่วยเหลือ',
    items: [
      {
        title: 'ช่วยเหลือ',
        path: paths.dashboard.help.root,
        icon: ICONS.external,
        children: [
          { title: 'คู่มือการใช้งาน', path: paths.dashboard.help.guides },
          { title: 'คำถามที่พบบ่อย', path: paths.dashboard.help.faq },
          { title: 'ติดต่อสนับสนุน', path: paths.dashboard.help.support },
        ],
      },
    ],
  },
];

// =================================================================
// INSTRUCTOR NAVIGATION (อาจารย์)
// =================================================================
export const instructorNavData = [
  /**
   * หน้าหลัก
   */
  {
    subheader: 'หน้าหลัก',
    items: [
      {
        title: 'ภาพรวมระบบ',
        path: paths.dashboard.root,
        icon: ICONS.dashboard
      },
      // { 
      //   title: 'สถิติการสอน', 
      //   path: paths.dashboard.analytics, 
      //   icon: ICONS.analytics 
      // },
    ],
  },

  /**
   * การจัดการรายวิชา
   */
  {
    subheader: 'การจัดการรายวิชา',
    items: [
      {
        title: 'รายวิชา',
        path: paths.dashboard.subject.root,
        icon: ICONS.course,
        children: [
          { title: 'ดูรายวิชาทั้งหมด', path: paths.dashboard.subject.list },
          { title: 'สร้างรายวิชาใหม่', path: paths.dashboard.subject.new },
          { title: 'จัดการรายวิชา', path: paths.dashboard.subject.root },
        ],
      },
      {
        title: 'หลักสูตร',
        path: paths.dashboard.curriculum.root,
        icon: ICONS.kanban,
        children: [
          { title: 'ดูหลักสูตรทั้งหมด', path: paths.dashboard.curriculum.list },
          { title: 'สร้างหลักสูตรใหม่', path: paths.dashboard.curriculum.new },
          { title: 'จัดการหลักสูตร', path: paths.dashboard.curriculum.root },
        ],
      },
      {
        title: 'อัปโหลดเนื้อหา / เอกสารประกอบการเรียน',
        path: paths.dashboard.content.root,
        icon: ICONS.folder,
        children: [
          { title: 'จัดการไฟล์', path: paths.dashboard.content.files },
          { title: 'อัปโหลดเอกสาร', path: paths.dashboard.content.upload },
          { title: 'วีดิโอบรรยาย', path: paths.dashboard.content.videos },
          { title: 'ห้องสมุดเอกสาร', path: paths.dashboard.content.library },
          { title: 'งานที่มอบหมาย', path: paths.dashboard.content.assignments },
        ],
      },
      {
        title: 'ตารางเรียน',
        path: paths.dashboard.schedule.root,
        icon: ICONS.calendar,
        children: [
          { title: 'ปฏิทินการสอน', path: paths.dashboard.schedule.calendar },
          { title: 'สร้างตารางใหม่', path: paths.dashboard.schedule.create },
          { title: 'เซสชันการสอน', path: paths.dashboard.schedule.sessions },
        ],
      },
    ],
  },

  /**
   * การประเมินผล
   */
  {
    subheader: 'การประเมินผล',
    items: [
      {
        title: 'สร้างข้อสอบและแบบฝึกหัด',
        path: paths.dashboard.exams.root,
        icon: ICONS.label,
        children: [
          { title: 'รายการข้อสอบ', path: paths.dashboard.exams.list },
          { title: 'สร้างข้อสอบใหม่', path: paths.dashboard.exams.create },
          { title: 'จัดการคำถาม', path: paths.dashboard.exams.root },
          { title: 'ตั้งค่าการสอบ', path: paths.dashboard.exams.root },
        ],
      },
      {
        title: 'ตรวจข้อสอบและให้คะแนน',
        path: paths.dashboard.grading.root,
        icon: ICONS.order,
        children: [
          { title: 'รายการที่ต้องตรวจ', path: paths.dashboard.grading.pending },
          { title: 'ประวัติการให้คะแนน', path: paths.dashboard.grading.completed },
          { title: 'สถิติการให้คะแนน', path: paths.dashboard.grading.analytics },
          { title: 'เกณฑ์การให้คะแนน', path: paths.dashboard.grading.rubrics },
        ],
      },
    ],
  },

  /**
   * การจัดการนักเรียน
   */
  {
    subheader: 'การจัดการนักเรียน',
    items: [
      {
        title: 'ตู่การผลการเรียนของนักศึกษาในรายวิชาของ',
        path: paths.dashboard.students.root,
        icon: ICONS.user,
        children: [
          { title: 'รายชื่อนักเรียน', path: paths.dashboard.students.list },
          { title: 'ผลการเรียน', path: paths.dashboard.students.root },
          { title: 'ติดตามพัฒนาการ', path: paths.dashboard.students.root },
          { title: 'การลงทะเบียน', path: paths.dashboard.students.enrollment },
          { title: 'นักเรียนที่ปรึกษา', path: paths.dashboard.students.advisees },
        ],
      },
    ],
  },

  /**
   * การสื่อสาร
   */
  {
    subheader: 'การสื่อสาร',
    items: [
      {
        title: 'ข้อความ',
        path: paths.dashboard.messages.root,
        icon: ICONS.mail,
        info: (
          <Label color="error" variant="inverted">
            ใหม่
          </Label>
        ),
        children: [
          { title: 'กล่องขาเข้า', path: paths.dashboard.messages.inbox },
          { title: 'เขียนข้อความ', path: paths.dashboard.messages.compose },
          { title: 'ข้อความที่ส่ง', path: paths.dashboard.messages.sent },
        ],
      },
      {
        title: 'แชท',
        path: paths.dashboard.chat.root,
        icon: ICONS.chat
      },
      {
        title: 'ประกาศ',
        path: paths.dashboard.announcements.root,
        icon: ICONS.booking,
        children: [
          { title: 'ดูประกาศทั้งหมด', path: paths.dashboard.announcements.root },
          { title: 'สร้างประกาศใหม่', path: paths.dashboard.announcements.create },
        ],
      },
    ],
  },

  /**
   * การประสานงาน
   */
  {
    subheader: 'การประสานงาน',
    items: [
      {
        title: 'ประสานงานกับผู้ดูแลระบบ/เจ้าหน้าที่',
        path: paths.dashboard.admin.support.root,
        icon: ICONS.external,
        children: [
          { title: 'แจ้งปัญหาหรือข้อเสียแล้วลงคะแรงรายวิชา', path: paths.dashboard.admin.support.tickets },
          { title: 'ขอพึ่มผู้ช่วยสอน (TA)', path: paths.dashboard.admin.support.helpdesk },
        ],
      },
    ],
  },

  /**
   * รายงาน
   */
  {
    subheader: 'รายงาน',
    items: [
      {
        title: 'รายงานการสอน',
        path: paths.dashboard.reports.root,
        icon: ICONS.analytics,
        children: [
          { title: 'รายงานรายวิชา', path: paths.dashboard.reports.courses },
          { title: 'รายงานนักเรียน', path: paths.dashboard.reports.students },
          { title: 'รายงานการสอบ', path: paths.dashboard.reports.exams },
          { title: 'รายงานการเข้าเรียน', path: paths.dashboard.reports.attendance },
          { title: 'รายงานผลการเรียน', path: paths.dashboard.reports.performance },
        ],
      },
    ],
  },

  /**
   * การตั้งค่า
   */
  {
    subheader: 'การตั้งค่า',
    items: [
      {
        title: 'ตั้งค่าระบบ',
        path: paths.dashboard.settings.root,
        icon: ICONS.lock,
        allowedRoles: ['admin', 'instructor'],
        children: [
          { title: 'โปรไฟล์', path: paths.dashboard.settings.profile },
          { title: 'บัญชีผู้ใช้', path: paths.dashboard.settings.account },
          { title: 'การอนุญาต', path: paths.dashboard.settings.permissions },
          { title: 'ตั้งค่าทั่วไป', path: paths.dashboard.settings.preferences },
        ],
      },
      {
        title: 'ช่วยเหลือ',
        path: paths.dashboard.help.root,
        icon: ICONS.external,
        children: [
          { title: 'คู่มือการใช้งาน', path: paths.dashboard.help.guides },
          { title: 'คำถามที่พบบ่อย', path: paths.dashboard.help.faq },
          { title: 'ติดต่อสนับสนุน', path: paths.dashboard.help.support },
          {
            title: 'เว็บไซต์ช่วยเหลือ',
            path: 'https://help.rmu.ac.th/',
            info: <Iconify width={18} icon="eva:external-link-fill" />
          },
        ],
      },
    ],
  },
];

// =================================================================
// ADMINISTRATOR NAVIGATION (ผู้ดูแลระบบ)
// =================================================================
export const adminNavData = [
  /**
   * หน้าหลัก
   */
  {
    subheader: 'หน้าหลัก',
    items: [
      {
        title: 'ภาพรวมระบบ',
        path: paths.dashboard.admin.dashboard,
        icon: ICONS.dashboard
      },
      {
        title: 'สถิติระบบ',
        path: paths.dashboard.analytics,
        icon: ICONS.analytics
      },
    ],
  },

  /**
   * การจัดการผู้ใช้
   */
  {
    subheader: 'การจัดการผู้ใช้',
    items: [
      {
        title: 'จัดการผู้ใช้งานระบบ',
        path: paths.dashboard.admin.users.root,
        icon: ICONS.user,
        children: [
          // { title: 'สร้าง แก้ไข คนบุญผู้ใช้งาน', path: paths.dashboard.admin.users.root },
          { title: 'นักเรียน', path: paths.dashboard.admin.users.students },
          { title: 'อาจารย์/ผู้สอน', path: paths.dashboard.admin.users.instructors },
          { title: 'เจ้าหน้าที่', path: paths.dashboard.admin.users.staff },
          // { title: 'กำหนดสิทธิ์การใช้งาน', path: paths.dashboard.admin.users.permissions },
          // { title: 'บทบาทผู้ใช้', path: paths.dashboard.admin.users.roles },
        ],
      },
    ],
  },

  /**
   * การจัดการข้อมูลหลักสูตร
   */
  {
    subheader: 'การจัดการข้อมูลหลักสูตร',
    items: [
      {
        title: 'จัดการข้อมูลหลักสูตร คณะ สาขา รายวิชา',
        path: paths.dashboard.admin.academic.root,
        icon: ICONS.course,
        children: [
          { title: 'จัดการคณะ', path: paths.dashboard.admin.academic.departments },
          { title: 'จัดการสาขา', path: paths.dashboard.admin.academic.majors },
          { title: 'จัดการหลักสูตร', path: paths.dashboard.admin.academic.curriculums },
          { title: 'จัดการรายวิชา', path: paths.dashboard.admin.academic.subjects },
          // { title: 'กำหนดเงื่อนไขและข้อกำหนด', path: paths.dashboard.admin.academic.subjects },
        ],
      },
    ],
  },

  /**
   * การจัดการเกรดและผลการเรียน
   */
  {
    subheader: 'การจัดการเกรดและผลการเรียน',
    items: [
      {
        title: 'ตรวจสอบและรอบมีให้ผลการเรียน',
        path: paths.dashboard.admin.grades.root,
        icon: ICONS.order,
        children: [
          { title: 'ตรวจสอบการบองเติก์ของผู้ใช้แลพยคิไ', path: paths.dashboard.admin.grades.verification },
          { title: 'อนุมีติผลการเรียน', path: paths.dashboard.admin.grades.approval },
          { title: 'โอนเกรด', path: paths.dashboard.admin.grades.transfer },
          { title: 'ใบแสดงผลการเรียน', path: paths.dashboard.admin.grades.transcripts },
          { title: 'ตรวจสอบการขุบงาน', path: paths.dashboard.admin.grades.audit },
        ],
      },
    ],
  },

  /**
   * การอนุมัติและเอกสาร
   */
  {
    subheader: 'การอนุมัติและเอกสาร',
    items: [
      {
        title: 'อนุมัติและขออนุญาต',
        path: paths.dashboard.admin.approvals.root,
        icon: ICONS.invoice,
        children: [
          { title: 'ตรวจสอบการข้อพอมเอกสาร (Transcript, ใบประกานยอมต่างๆ)', path: paths.dashboard.admin.approvals.documents },
          { title: 'อกนเอกสารพร้อมลายเครื่องหมายอีตง', path: paths.dashboard.admin.approvals.requests },
          { title: 'ขิปปีกระของการอานุมัติ', path: paths.dashboard.admin.approvals.workflow },
          { title: 'ประวัติการอนุมัติ', path: paths.dashboard.admin.approvals.history },
        ],
      },
    ],
  },

  /**
   * การเชื่อมต่อระบบ
   */
  {
    subheader: 'การเชื่อมต่อระบบ',
    items: [
      {
        title: 'ตรวจการเชื่อมต่อกับระบบภายนอก',
        path: paths.dashboard.admin.integration.root,
        icon: ICONS.external,
        children: [
          { title: 'เชื่อมกับระบบ LMS, MOOC, หรือ API หรือ่วน-ทาผายนอก', path: paths.dashboard.admin.integration.lms },
          { title: 'MOOC', path: paths.dashboard.admin.integration.mooc },
          { title: 'API', path: paths.dashboard.admin.integration.api },
          { title: 'ตรวจสอบการนำเข้าข้อเสังทหลาผายาอขากสระบบ', path: paths.dashboard.admin.integration.sync },
          { title: 'สถานะการเชื่อมต่อ', path: paths.dashboard.admin.integration.status },
        ],
      },
    ],
  },

  /**
   * การจัดการข้อมูล
   */
  {
    subheader: 'การจัดการข้อมูล',
    items: [
      {
        title: 'วิเคราะห์ข้อมูลและจัดการงาน',
        path: paths.dashboard.admin.data.root,
        icon: ICONS.analytics,
        children: [
          { title: 'รายะศานกนักขบ้านใการของนักศรากนักคา', path: paths.dashboard.admin.data.analytics },
          { title: 'นำเข้าข้อมูล', path: paths.dashboard.admin.data.import },
          { title: 'ส่งออกข้อมูล เป็น PDF, Excel', path: paths.dashboard.admin.data.export },
          { title: 'ใบคสำรองข้อมูล', path: paths.dashboard.admin.data.backup },
          { title: 'รายงาน', path: paths.dashboard.admin.data.reports },
        ],
      },
    ],
  },

  /**
   * การติดตามระบบ
   */
  {
    subheader: 'การติดตามระบบ',
    items: [
      {
        title: 'ติดตามระบบและดูผลงานข้อมูล',
        path: paths.dashboard.admin.monitoring.root,
        icon: ICONS.kanban,
        children: [
          { title: 'ติดตารมระบบรักน เช่น ปฏิกคริการ ช่วงอขลาเสพร เรียน', path: paths.dashboard.admin.monitoring.performance },
          { title: 'การงาน/ดาการูบข้อมูล', path: paths.dashboard.admin.monitoring.logs },
          { title: 'ข้อผิดพลาด', path: paths.dashboard.admin.monitoring.errors },
          { title: 'การใช้งาน Log การใด้งานระบบ', path: paths.dashboard.admin.monitoring.usage },
          { title: 'ความปลอดภัย', path: paths.dashboard.admin.monitoring.security },
        ],
      },
    ],
  },

  /**
   * ระบบช่วยเหลือ
   */
  {
    subheader: 'ระบบช่วยเหลือ',
    items: [
      {
        title: 'ระบบช่วยเหลือผู้ใช้งาน',
        path: paths.dashboard.admin.support.root,
        icon: ICONS.external,
        children: [
          { title: 'ตอบคำถามผ่าน Helpdesk', path: paths.dashboard.admin.support.helpdesk },
          { title: 'บริการจัดการคำร้องขุ้ผู้', path: paths.dashboard.admin.support.tickets },
          { title: 'ฐานความ knowledge', path: paths.dashboard.admin.support.knowledge },
          { title: 'คำถามที่พบบ่อย', path: paths.dashboard.admin.support.faq },
        ],
      },
    ],
  },

  /**
   * การตั้งค่าระบบ
   */
  {
    subheader: 'การตั้งค่าระบบ',
    items: [
      {
        title: 'ตั้งค่าระบบ',
        path: paths.dashboard.settings.root,
        icon: ICONS.lock,
        allowedRoles: ['admin'],
        children: [
          { title: 'การตั้งค่าระบบทั่วไป', path: paths.dashboard.settings.system },
          { title: 'การอนุญาต', path: paths.dashboard.settings.permissions },
          { title: 'การแจ้งเตือน', path: paths.dashboard.settings.notifications },
          { title: 'ตั้งค่าผู้ใช้', path: paths.dashboard.settings.preferences },
        ],
      },
    ],
  },
];

// =================================================================
// DEFAULT NAVIGATION (เมนูหลัก - ปรับตาม role)
// =================================================================
export const navData = instructorNavData; // Default เป็นอาจารย์

/**
 * ฟังก์ชันสำหรับการเลือก navigation ตาม role
 */
export const getNavDataByRole = (userRole) => {
  console.log("🚀 ~ getNavDataByRole ~ userRole:", userRole)
  switch (userRole) {
    case 'USER':
    case 'STUDENT':
      return studentNavData;
    case 'INSTRUCTOR':
      return instructorNavData;
    case 'ADMIN':
      return adminNavData;
    default:
      return instructorNavData; // Default
  }
};
