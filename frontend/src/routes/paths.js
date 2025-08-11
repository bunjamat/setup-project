// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',

};

// ----------------------------------------------------------------------

export const paths = {
  /**
   * Marketing
   */
  marketing: {
    root: '/marketing',
    services: '/marketing/services',
    caseStudies: '/marketing/case-studies',
    caseStudy: (id) => `/marketing/case-studies/${id}`,
    posts: '/marketing/posts',
    post: '/marketing/posts/details',
    about: '/marketing/about',
    contact: '/marketing/contact',
  },
  /**
   * Travel
   */
  travel: {
    root: '/travel',
    tours: '/travel/tours',
    tour: '/travel/tours/details',
    checkout: '/travel/checkout',
    orderCompleted: '/travel/order-completed',
    posts: '/travel/posts',
    post: '/travel/posts/details',
    about: '/travel/about',
    contact: '/travel/contact',
  },
  /**
   * Career
   */
  career: {
    root: '/career',
    jobs: '/career/jobs',
    job: '/career/jobs/details',
    posts: '/career/posts',
    post: '/career/posts/details',
    about: '/career/about',
    contact: '/career/contact',
  },
  /**
   * E-learning
   */
  eLearning: {
    root: '/e-learning',
    courses: '/e-learning/courses',
    course: '/e-learning/courses/details',
    posts: '/e-learning/posts',
    post: '/e-learning/posts/details',
    about: '/e-learning/about',
    contact: '/e-learning/contact',
  },
  /**
   * E-commerce
   */
  eCommerce: {
    root: '/e-commerce',
    products: '/e-commerce/products',
    product: '/e-commerce/products/details',
    cart: '/e-commerce/cart',
    checkout: '/e-commerce/checkout',
    orderCompleted: '/e-commerce/order-completed',
    wishlist: '/e-commerce/wishlist',
    compare: '/e-commerce/compare',
  },
  /**
   * Account
   */
  account: {
    root: '/account',
    personal: '/account/personal',
    wishlist: '/account/wishlist',
    vouchers: '/account/vouchers',
    orders: '/account/orders',
    payment: '/account/payment',
  },
  /**
   * Auth
   */
  split: {
    signIn: '/split/sign-in',
    signUp: '/split/sign-up',
  },
  centered: {
    signIn: '/centered/sign-in',
    signUp: '/centered/sign-up',
  },
  illustration: {
    signIn: '/illustration/sign-in',
    signUp: '/illustration/sign-up',
  },
  verify: '/verify',
  resetPassword: '/reset-password',
  updatePassword: '/update-password',
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  /**
   * Common
   */
  maintenance: '/maintenance',
  comingsoon: '/coming-soon',
  pricingCards: '/pricing-cards',
  pricingColumns: '/pricing-columns',
  payment: '/payment',
  support: '/support',
  page404: '/error/404',
  page500: '/error/500',
  /**
   * Others
   */
  components: '/components',
  pages: '/pages',
  docs: 'https://zone-docs.vercel.app',
  license: 'https://material-ui.com/store/license/#i-standard-license',
  minimalStore: 'https://material-ui.com/store/items/minimal-dashboard',
  zoneStore: 'https://mui.com/store/items/zone-landing-page/',
  figmaUrl: 'https://www.figma.com/design/gDMIMT5RHyvA5NnDCTOGrD/%5BPreview%5D-Zone-Web.v4.0.0',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/sign-in`,
      signUp: `${ROOTS.AUTH}/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD - RMU Credit Bank System
  dashboard: {
    root: ROOTS.DASHBOARD,
    
    // Overview (หน้าหลัก) - ทุก role
    overview: `${ROOTS.DASHBOARD}/overview`,
    analytics: `${ROOTS.DASHBOARD}/analytics`,
    
    // =================================================================
    // STUDENT ROUTES (นักศึกษา)
    // =================================================================
    
    // Student Registration (ลงทะเบียนรายวิชา)
    student: {
      root: `${ROOTS.DASHBOARD}/student`,
      dashboard: `${ROOTS.DASHBOARD}/student/dashboard`,
      
      // Course Registration (ลงทะเบียนรายวิชา)
      registration: {
        root: `${ROOTS.DASHBOARD}/student/registration`,
        courses: `${ROOTS.DASHBOARD}/student/registration/courses`,
        enroll: `${ROOTS.DASHBOARD}/student/registration/enroll`,
        schedule: `${ROOTS.DASHBOARD}/student/registration/schedule`,
        history: `${ROOTS.DASHBOARD}/student/registration/history`,
      },
      
      // Credit Check (ตรวจสอบหน่วยกิต)
      credits: {
        root: `${ROOTS.DASHBOARD}/student/credits`,
        summary: `${ROOTS.DASHBOARD}/student/credits/summary`,
        transfer: `${ROOTS.DASHBOARD}/student/credits/transfer`,
        bank: `${ROOTS.DASHBOARD}/student/credits/bank`,
        verification: `${ROOTS.DASHBOARD}/student/credits/verification`,
      },
      
      // Curriculum & Study Plan (ตรวจสอบหลักสูตรและแผนการเรียน)
      curriculum: {
        root: `${ROOTS.DASHBOARD}/student/curriculum`,
        plan: `${ROOTS.DASHBOARD}/student/curriculum/plan`,
        progress: `${ROOTS.DASHBOARD}/student/curriculum/progress`,
        requirements: `${ROOTS.DASHBOARD}/student/curriculum/requirements`,
        advisor: `${ROOTS.DASHBOARD}/student/curriculum/advisor`,
      },
      
      // Academic Performance (ตรวจสอบผลการเรียน)
      academic: {
        root: `${ROOTS.DASHBOARD}/student/academic`,
        grades: `${ROOTS.DASHBOARD}/student/academic/grades`,
        transcript: `${ROOTS.DASHBOARD}/student/academic/transcript`,
        gpa: `${ROOTS.DASHBOARD}/student/academic/gpa`,
        evaluation: `${ROOTS.DASHBOARD}/student/academic/evaluation`,
      },
      
      // Online Learning (เข้าร่วมพบเยี่ยมและฟ้าฟอน)
      learning: {
        root: `${ROOTS.DASHBOARD}/student/learning`,
        sessions: `${ROOTS.DASHBOARD}/student/learning/sessions`,
        lms: `${ROOTS.DASHBOARD}/student/learning/lms`,
        materials: `${ROOTS.DASHBOARD}/student/learning/materials`,
        assignments: `${ROOTS.DASHBOARD}/student/learning/assignments`,
      },
      
      // Final Projects (วินิจารณ์งานต้น)
      projects: {
        root: `${ROOTS.DASHBOARD}/student/projects`,
        submission: `${ROOTS.DASHBOARD}/student/projects/submission`,
        review: `${ROOTS.DASHBOARD}/student/projects/review`,
        feedback: `${ROOTS.DASHBOARD}/student/projects/feedback`,
      },
      
      // Data Requests (จัดการข้อมูลส่วนตัว)
      profile: {
        root: `${ROOTS.DASHBOARD}/student/profile`,
        personal: `${ROOTS.DASHBOARD}/student/profile/personal`,
        documents: `${ROOTS.DASHBOARD}/student/profile/documents`,
        requests: `${ROOTS.DASHBOARD}/student/profile/requests`,
      },
    },
    
    // =================================================================
    // INSTRUCTOR ROUTES (อาจารย์) - Enhanced from previous version
    // =================================================================
    
    // Course Management (การจัดการรายวิชา)
    courses: {
      root: `${ROOTS.DASHBOARD}/courses`,
      list: `${ROOTS.DASHBOARD}/courses/list`,
      create: `${ROOTS.DASHBOARD}/courses/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/courses/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/courses/${id}`,
      settings: (id) => `${ROOTS.DASHBOARD}/courses/${id}/settings`,
      syllabus: (id) => `${ROOTS.DASHBOARD}/courses/${id}/syllabus`,
    },
    
    // Content Management (เนื้อหาและเอกสาร)
    content: {
      root: `${ROOTS.DASHBOARD}/content`,
      files: `${ROOTS.DASHBOARD}/content/files`,
      upload: `${ROOTS.DASHBOARD}/content/upload`,
      videos: `${ROOTS.DASHBOARD}/content/videos`,
      materials: `${ROOTS.DASHBOARD}/content/materials`,
      library: `${ROOTS.DASHBOARD}/content/library`,
      assignments: `${ROOTS.DASHBOARD}/content/assignments`,
    },
    
    // Schedule (ตารางเรียน)
    schedule: {
      root: `${ROOTS.DASHBOARD}/schedule`,
      calendar: `${ROOTS.DASHBOARD}/schedule/calendar`,
      create: `${ROOTS.DASHBOARD}/schedule/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/schedule/${id}/edit`,
      sessions: `${ROOTS.DASHBOARD}/schedule/sessions`,
    },
    
    // Assessment (การประเมินผล)
    exams: {
      root: `${ROOTS.DASHBOARD}/exams`,
      list: `${ROOTS.DASHBOARD}/exams/list`,
      create: `${ROOTS.DASHBOARD}/exams/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/exams/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/exams/${id}`,
      questions: (id) => `${ROOTS.DASHBOARD}/exams/${id}/questions`,
      settings: (id) => `${ROOTS.DASHBOARD}/exams/${id}/settings`,
      results: (id) => `${ROOTS.DASHBOARD}/exams/${id}/results`,
    },
    
    // Grading (การตรวจและให้คะแนน)
    grading: {
      root: `${ROOTS.DASHBOARD}/grading`,
      pending: `${ROOTS.DASHBOARD}/grading/pending`,
      completed: `${ROOTS.DASHBOARD}/grading/completed`,
      grade: (examId, studentId) => `${ROOTS.DASHBOARD}/grading/${examId}/${studentId}`,
      history: `${ROOTS.DASHBOARD}/grading/history`,
      analytics: `${ROOTS.DASHBOARD}/grading/analytics`,
      rubrics: `${ROOTS.DASHBOARD}/grading/rubrics`,
    },
    
    // Student Management (การจัดการนักเรียน)
    students: {
      root: `${ROOTS.DASHBOARD}/students`,
      list: `${ROOTS.DASHBOARD}/students/list`,
      profile: (id) => `${ROOTS.DASHBOARD}/students/${id}`,
      grades: (id) => `${ROOTS.DASHBOARD}/students/${id}/grades`,
      progress: (id) => `${ROOTS.DASHBOARD}/students/${id}/progress`,
      attendance: (id) => `${ROOTS.DASHBOARD}/students/${id}/attendance`,
      enrollment: `${ROOTS.DASHBOARD}/students/enrollment`,
      advisees: `${ROOTS.DASHBOARD}/students/advisees`,
    },
    
    // =================================================================
    // ADMINISTRATOR ROUTES (ผู้ดูแลระบบ)
    // =================================================================
    
    // User Management (จัดการผู้ใช้งานระบบ)
    admin: {
      root: `${ROOTS.DASHBOARD}/admin`,
      dashboard: `${ROOTS.DASHBOARD}/admin/dashboard`,
      
      // User Management
      users: {
        root: `${ROOTS.DASHBOARD}/users`,
        students: `${ROOTS.DASHBOARD}/users/students`,
        instructors: `${ROOTS.DASHBOARD}/users/instructors`,
        staff: `${ROOTS.DASHBOARD}/users/staff`,
        create: `${ROOTS.DASHBOARD}/users/create`,
        createInstructor: `${ROOTS.DASHBOARD}/users/instructors/create`,
        editInstructor: (id) => `${ROOTS.DASHBOARD}/users/instructors/${id}/edit`,
        edit: (id) => `${ROOTS.DASHBOARD}/users/${id}/edit`,
        permissions: `${ROOTS.DASHBOARD}/users/permissions`,
        roles: `${ROOTS.DASHBOARD}/users/roles`,
      },
      
      // Academic Data Management (จัดการข้อมูลหลักสูตร คณะ สาขา รายวิชา)
      academic: {
        root: `${ROOTS.DASHBOARD}/academic`,
        departments: `${ROOTS.DASHBOARD}/academic/departments`,
        majors: `${ROOTS.DASHBOARD}/academic/majors`,
        curriculums: `${ROOTS.DASHBOARD}/academic/curriculums`,
        subjects: `${ROOTS.DASHBOARD}/academic/subjects`,
      },
      
      // Grade & Credit Management (ตรวจสอบและรอบมีให้ผลการเรียน)
      grades: {
        root: `${ROOTS.DASHBOARD}/grades`,
        verification: `${ROOTS.DASHBOARD}/grades/verification`,
        approval: `${ROOTS.DASHBOARD}/grades/approval`,
        transfer: `${ROOTS.DASHBOARD}/grades/transfer`,
        transcripts: `${ROOTS.DASHBOARD}/grades/transcripts`,
        audit: `${ROOTS.DASHBOARD}/grades/audit`,
      },
      
      // Document & Request Management (อนุมัติและขออนุกฎ)
      approvals: {
        root: `${ROOTS.DASHBOARD}/approvals`,
        documents: `${ROOTS.DASHBOARD}/approvals/documents`,
        requests: `${ROOTS.DASHBOARD}/approvals/requests`,
        workflow: `${ROOTS.DASHBOARD}/approvals/workflow`,
        history: `${ROOTS.DASHBOARD}/approvals/history`,
      },
      
      // System Integration (ตรวจการเชื่อมต่อกับระบบภายนอก)
      integration: {
        root: `${ROOTS.DASHBOARD}/integration`,
        lms: `${ROOTS.DASHBOARD}/integration/lms`,
        mooc: `${ROOTS.DASHBOARD}/integration/mooc`,
        api: `${ROOTS.DASHBOARD}/integration/api`,
        sync: `${ROOTS.DASHBOARD}/integration/sync`,
        status: `${ROOTS.DASHBOARD}/integration/status`,
      },
      
      // Data Management & Export (วิเคราะห์ข้อมูลและจัดการงาน)
      data: {
          root: `${ROOTS.DASHBOARD}/data`,
        export: `${ROOTS.DASHBOARD}/data/export`,
        import: `${ROOTS.DASHBOARD}/data/import`,
        backup: `${ROOTS.DASHBOARD}/data/backup`,
        analytics: `${ROOTS.DASHBOARD}/data/analytics`,
        reports: `${ROOTS.DASHBOARD}/data/reports`,
      },
      
      // System Monitoring (ติดตามระบบและดูผลงานข้อมูล)
      monitoring: {
        root: `${ROOTS.DASHBOARD}/monitoring`,
        performance: `${ROOTS.DASHBOARD}/monitoring/performance`,
        logs: `${ROOTS.DASHBOARD}/monitoring/logs`,
        errors: `${ROOTS.DASHBOARD}/monitoring/errors`,
        usage: `${ROOTS.DASHBOARD}/monitoring/usage`,
        security: `${ROOTS.DASHBOARD}/monitoring/security`,
      },
      
      // Support System (ระบบช่วยเหลือผู้ใช้งาน)
      support: {
        root: `${ROOTS.DASHBOARD}/support`,
        tickets: `${ROOTS.DASHBOARD}/support/tickets`,
        helpdesk: `${ROOTS.DASHBOARD}/support/helpdesk`,
        knowledge: `${ROOTS.DASHBOARD}/support/knowledge`,
        faq: `${ROOTS.DASHBOARD}/support/faq`,
      },
    },
    
    // =================================================================
    // CURRICULUM MANAGEMENT (จัดการหลักสูตร)
    // =================================================================
    
    // Curriculum Management (การจัดการหลักสูตร)
    curriculum: {
      root: `${ROOTS.DASHBOARD}/academic/curriculums`,
      list: `${ROOTS.DASHBOARD}/academic/curriculums`,
      new: `${ROOTS.DASHBOARD}/academic/curriculums/new`,
      create: `${ROOTS.DASHBOARD}/academic/curriculums/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/academic/curriculums/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/academic/curriculums/${id}`,
      structure: (id) => `${ROOTS.DASHBOARD}/academic/curriculums/${id}/structure`,
      courses: (id) => `${ROOTS.DASHBOARD}/academic/curriculums/${id}/courses`,
      requirements: (id) => `${ROOTS.DASHBOARD}/academic/curriculums/${id}/requirements`,
      settings: (id) => `${ROOTS.DASHBOARD}/academic/curriculums/${id}/settings`,
    },
    
    // =================================================================
    // SUBJECT MANAGEMENT (จัดการรายวิชา)
    // =================================================================
    
    // Subject Management (การจัดการรายวิชา)
    subject: {
      root: `${ROOTS.DASHBOARD}/academic/subjects`,
      list: `${ROOTS.DASHBOARD}/academic/subjects`,
      new: `${ROOTS.DASHBOARD}/academic/subjects/new`,
      create: `${ROOTS.DASHBOARD}/academic/subjects/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/academic/subjects/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/academic/subjects/${id}`,
      lessons: (id) => `${ROOTS.DASHBOARD}/academic/subjects/${id}/lessons`,
      assessments: (id) => `${ROOTS.DASHBOARD}/academic/subjects/${id}/assessments`,
      enrollments: (id) => `${ROOTS.DASHBOARD}/academic/subjects/${id}/enrollments`,
      settings: (id) => `${ROOTS.DASHBOARD}/academic/subjects/${id}/settings`,
    },
    
    // =================================================================
    // SHARED ROUTES (ใช้ร่วมกันทุก role)
    // =================================================================
    
    // Communication (การสื่อสาร)
    messages: {
      root: `${ROOTS.DASHBOARD}/messages`,
      inbox: `${ROOTS.DASHBOARD}/messages/inbox`,
      compose: `${ROOTS.DASHBOARD}/messages/compose`,
      sent: `${ROOTS.DASHBOARD}/messages/sent`,
      conversation: (id) => `${ROOTS.DASHBOARD}/messages/${id}`,
    },
    
    chat: {
      root: `${ROOTS.DASHBOARD}/chat`,
      room: (id) => `${ROOTS.DASHBOARD}/chat/${id}`,
    },
    
    // Announcements (ประกาศ)
    announcements: {
      root: `${ROOTS.DASHBOARD}/announcements`,
      create: `${ROOTS.DASHBOARD}/announcements/create`,
      edit: (id) => `${ROOTS.DASHBOARD}/announcements/${id}/edit`,
      details: (id) => `${ROOTS.DASHBOARD}/announcements/${id}`,
    },
    
    // Reports (รายงาน)
    reports: {
      root: `${ROOTS.DASHBOARD}/reports`,
      courses: `${ROOTS.DASHBOARD}/reports/courses`,
      students: `${ROOTS.DASHBOARD}/reports/students`,
      exams: `${ROOTS.DASHBOARD}/reports/exams`,
      attendance: `${ROOTS.DASHBOARD}/reports/attendance`,
      performance: `${ROOTS.DASHBOARD}/reports/performance`,
      credit: `${ROOTS.DASHBOARD}/reports/credit`,
      academic: `${ROOTS.DASHBOARD}/reports/academic`,
    },
    
    // Settings (การตั้งค่า)
    settings: {
      root: `${ROOTS.DASHBOARD}/settings`,
      profile: `${ROOTS.DASHBOARD}/settings/profile`,
      account: `${ROOTS.DASHBOARD}/settings/account`,
      preferences: `${ROOTS.DASHBOARD}/settings/preferences`,
      permissions: `${ROOTS.DASHBOARD}/settings/permissions`,
      system: `${ROOTS.DASHBOARD}/settings/system`,
      notifications: `${ROOTS.DASHBOARD}/settings/notifications`,
    },
    
    // Help & Support (ช่วยเหลือ)
    help: {
      root: `${ROOTS.DASHBOARD}/help`,
      guides: `${ROOTS.DASHBOARD}/help/guides`,
      faq: `${ROOTS.DASHBOARD}/help/faq`,
      support: `${ROOTS.DASHBOARD}/help/support`,
      contact: `${ROOTS.DASHBOARD}/help/contact`,
      tutorials: `${ROOTS.DASHBOARD}/help/tutorials`,
    },
    
    // =================================================================
    // LEGACY ROUTES (รองรับระบบเดิม)
    // =================================================================
    
    // Legacy routes for compatibility
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
    
    // General routes (for existing components)
    general: {
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      ecommerce: `${ROOTS.DASHBOARD}/general/ecommerce`,
      banking: `${ROOTS.DASHBOARD}/general/banking`,
      booking: `${ROOTS.DASHBOARD}/general/booking`,
      file: `${ROOTS.DASHBOARD}/general/file`,
      course: `${ROOTS.DASHBOARD}/courses`,
    },
    
    // User management (legacy - mapped to students)
    user: {
      root: `${ROOTS.DASHBOARD}/students`,
      list: `${ROOTS.DASHBOARD}/students/list`,
      cards: `${ROOTS.DASHBOARD}/students/cards`,
      new: `${ROOTS.DASHBOARD}/students/create`,
      account: `${ROOTS.DASHBOARD}/students/account`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/students/1/edit`,
      },
    },
    
    // Product management (mapped to content)
    product: {
      root: `${ROOTS.DASHBOARD}/content`,
      new: `${ROOTS.DASHBOARD}/content/upload`,
      demo: {
        details: `${ROOTS.DASHBOARD}/content/details`,
        edit: `${ROOTS.DASHBOARD}/content/edit`,
      },
    },
    
    // Order management (mapped to grading)
    order: {
      root: `${ROOTS.DASHBOARD}/grading`,
      demo: {
        details: `${ROOTS.DASHBOARD}/grading/details`,
      },
    },
    
    // Post management (mapped to exams)
    post: {
      root: `${ROOTS.DASHBOARD}/exams`,
      new: `${ROOTS.DASHBOARD}/exams/create`,
      demo: {
        details: `${ROOTS.DASHBOARD}/exams/details`,
        edit: `${ROOTS.DASHBOARD}/exams/edit`,
      },
    },
    
    // Invoice management (mapped to reports)
    invoice: {
      root: `${ROOTS.DASHBOARD}/reports`,
      new: `${ROOTS.DASHBOARD}/reports/create`,
      demo: {
        details: `${ROOTS.DASHBOARD}/reports/details`,
        edit: `${ROOTS.DASHBOARD}/reports/edit`,
      },
    },
    
    // Job management (mapped to announcements)
    job: {
      root: `${ROOTS.DASHBOARD}/announcements`,
      new: `${ROOTS.DASHBOARD}/announcements/create`,
      demo: {
        details: `${ROOTS.DASHBOARD}/announcements/details`,
        edit: `${ROOTS.DASHBOARD}/announcements/edit`,
      },
    },
    
    // Tour management (mapped to courses)
    tour: {
      root: `${ROOTS.DASHBOARD}/courses`,
      new: `${ROOTS.DASHBOARD}/courses/create`,
      demo: {
        details: `${ROOTS.DASHBOARD}/courses/details`,
        edit: `${ROOTS.DASHBOARD}/courses/edit`,
      },
    },
    
    // Other essential routes
    fileManager: `${ROOTS.DASHBOARD}/content/files`,
    mail: `${ROOTS.DASHBOARD}/messages`,
    calendar: `${ROOTS.DASHBOARD}/schedule/calendar`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    permission: `${ROOTS.DASHBOARD}/settings/permissions`,
    blank: `${ROOTS.DASHBOARD}/blank`,
  },
};
