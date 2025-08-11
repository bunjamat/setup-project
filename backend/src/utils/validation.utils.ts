import { t } from 'elysia';

// Validation schemas using Elysia's built-in validation
export const userSchemas = {
  createUser: t.Object({
    email: t.String({ format: 'email' }),
    username: t.String({ minLength: 3, maxLength: 50 }),
    password: t.String({ minLength: 6 }),
    firstName: t.String({ minLength: 1, maxLength: 100 }),
    lastName: t.String({ minLength: 1, maxLength: 100 }),
    role: t.Union([
      t.Literal('admin'),
      t.Literal('super_admin'),
      t.Literal('instructor'),
      t.Literal('student')
    ]),
    phoneNumber: t.Optional(t.String())
  }),

  login: t.Object({
    email: t.String({ format: 'email' }),
    password: t.String({ minLength: 1 })
  }),

  updateProfile: t.Object({
    firstName: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
    lastName: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
    phoneNumber: t.Optional(t.String()),
    profileImage: t.Optional(t.String())
  })
};

export const instructorSchemas = {
  createInstructor: t.Object({
    userId: t.Optional(t.Number({ minimum: 1 })),
    name: t.String({ minLength: 1, maxLength: 255 }),
    position: t.Optional(t.String({ maxLength: 100 })),
    departmentId: t.Optional(t.Number({ minimum: 1 })),
    rankingId: t.Optional(t.Number({ minimum: 1 })),
    description: t.Optional(t.String()),
    avatarPath: t.Optional(t.String()),
    avatarFileId: t.Optional(t.String()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('PENDING'),
      t.Literal('SUSPENDED')
    ]))
  }),

  updateInstructor: t.Object({
    userId: t.Optional(t.Number({ minimum: 1 })),
    name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    position: t.Optional(t.String({ maxLength: 100 })),
    departmentId: t.Optional(t.Number({ minimum: 1 })),
    rankingId: t.Optional(t.Number({ minimum: 1 })),
    description: t.Optional(t.String()),
    avatarPath: t.Optional(t.String()),
    avatarFileId: t.Optional(t.String()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('PENDING'),
      t.Literal('SUSPENDED')
    ]))
  }),

  instructorQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    departmentId: t.Optional(t.Numeric({ minimum: 1 })),
    rankingId: t.Optional(t.Numeric({ minimum: 1 })),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('PENDING'),
      t.Literal('SUSPENDED')
    ])),
    search: t.Optional(t.String({ minLength: 1 }))
  })
};

export const jobSchemas = {
  createJob: t.Object({
    title: t.String({ minLength: 3, maxLength: 200 }),
    description: t.String({ minLength: 10 }),
    requirements: t.Array(t.String()),
    salary: t.Number({ minimum: 0 }),
    salaryType: t.Union([
      t.Literal('hourly'),
      t.Literal('daily'),
      t.Literal('weekly'),
      t.Literal('monthly')
    ]),
    location: t.String({ minLength: 3, maxLength: 200 }),
    category: t.Union([
      t.Literal('food_service'),
      t.Literal('retail'),
      t.Literal('tutoring'),
      t.Literal('office_work'),
      t.Literal('event_staff'),
      t.Literal('delivery'),
      t.Literal('other')
    ]),
    workingHours: t.Object({
      monday: t.Optional(t.Array(t.Object({
        startTime: t.String({ pattern: '^\\d{2}:\\d{2}$' }),
        endTime: t.String({ pattern: '^\\d{2}:\\d{2}$' })
      }))),
      tuesday: t.Optional(t.Array(t.Object({
        startTime: t.String({ pattern: '^\\d{2}:\\d{2}$' }),
        endTime: t.String({ pattern: '^\\d{2}:\\d{2}$' })
      }))),
      wednesday: t.Optional(t.Array(t.Object({
        startTime: t.String({ pattern: '^\\d{2}:\\d{2}$' }),
        endTime: t.String({ pattern: '^\\d{2}:\\d{2}$' })
      }))),
      thursday: t.Optional(t.Array(t.Object({
        startTime: t.String({ pattern: '^\\d{2}:\\d{2}$' }),
        endTime: t.String({ pattern: '^\\d{2}:\\d{2}$' })
      }))),
      friday: t.Optional(t.Array(t.Object({
        startTime: t.String({ pattern: '^\\d{2}:\\d{2}$' }),
        endTime: t.String({ pattern: '^\\d{2}:\\d{2}$' })
      }))),
      saturday: t.Optional(t.Array(t.Object({
        startTime: t.String({ pattern: '^\\d{2}:\\d{2}$' }),
        endTime: t.String({ pattern: '^\\d{2}:\\d{2}$' })
      }))),
      sunday: t.Optional(t.Array(t.Object({
        startTime: t.String({ pattern: '^\\d{2}:\\d{2}$' }),
        endTime: t.String({ pattern: '^\\d{2}:\\d{2}$' })
      })))
    }),
    startDate: t.String({ format: 'date' }),
    endDate: t.Optional(t.String({ format: 'date' })),
    maxApplicants: t.Number({ minimum: 1 })
  }),

  updateJob: t.Object({
    title: t.Optional(t.String({ minLength: 3, maxLength: 200 })),
    description: t.Optional(t.String({ minLength: 10 })),
    requirements: t.Optional(t.Array(t.String())),
    salary: t.Optional(t.Number({ minimum: 0 })),
    salaryType: t.Optional(t.Union([
      t.Literal('hourly'),
      t.Literal('daily'),
      t.Literal('weekly'),
      t.Literal('monthly')
    ])),
    location: t.Optional(t.String({ minLength: 3, maxLength: 200 })),
    category: t.Optional(t.Union([
      t.Literal('food_service'),
      t.Literal('retail'),
      t.Literal('tutoring'),
      t.Literal('office_work'),
      t.Literal('event_staff'),
      t.Literal('delivery'),
      t.Literal('other')
    ])),
    status: t.Optional(t.Union([
      t.Literal('draft'),
      t.Literal('active'),
      t.Literal('paused'),
      t.Literal('expired'),
      t.Literal('closed')
    ])),
    maxApplicants: t.Optional(t.Number({ minimum: 1 }))
  })
};

export const applicationSchemas = {
  createApplication: t.Object({
    jobId: t.String(),
    coverLetter: t.Optional(t.String({ maxLength: 1000 }))
  }),

  updateApplication: t.Object({
    status: t.Union([
      t.Literal('pending'),
      t.Literal('reviewing'),
      t.Literal('accepted'),
      t.Literal('rejected'),
      t.Literal('withdrawn')
    ]),
    notes: t.Optional(t.String({ maxLength: 500 }))
  })
};

export const querySchemas = {
  pagination: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 }))
  }),

  jobQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    category: t.Optional(t.String()),
    salaryMin: t.Optional(t.Numeric({ minimum: 0 })),
    salaryMax: t.Optional(t.Numeric({ minimum: 0 })),
    location: t.Optional(t.String()),
    status: t.Optional(t.String()),
    search: t.Optional(t.String())
  })
};

// Academic Management Validation Schemas

export const institutionSchemas = {
  createInstitution: t.Object({
    name: t.String({ minLength: 1, maxLength: 255 }),
    code: t.String({ minLength: 1, maxLength: 20 }),
    type: t.Union([
      t.Literal('UNIVERSITY'),
      t.Literal('COLLEGE'),
      t.Literal('INSTITUTE'),
      t.Literal('TECHNICAL_COLLEGE'),
      t.Literal('VOCATIONAL_SCHOOL'),
      t.Literal('COMMUNITY_COLLEGE')
    ]),
    address: t.Optional(t.String()),
    website: t.Optional(t.String({ format: 'uri' })),
    phone: t.Optional(t.String({ maxLength: 20 })),
    email: t.Optional(t.String({ format: 'email' })),
    logo: t.Optional(t.String({ maxLength: 255 })),
    description: t.Optional(t.String()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  updateInstitution: t.Object({
    name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    code: t.Optional(t.String({ minLength: 1, maxLength: 20 })),
    type: t.Optional(t.Union([
      t.Literal('UNIVERSITY'),
      t.Literal('COLLEGE'),
      t.Literal('INSTITUTE'),
      t.Literal('TECHNICAL_COLLEGE'),
      t.Literal('VOCATIONAL_SCHOOL'),
      t.Literal('COMMUNITY_COLLEGE')
    ])),
    address: t.Optional(t.String()),
    website: t.Optional(t.String({ format: 'uri' })),
    phone: t.Optional(t.String({ maxLength: 20 })),
    email: t.Optional(t.String({ format: 'email' })),
    logo: t.Optional(t.String({ maxLength: 255 })),
    description: t.Optional(t.String()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  institutionQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    type: t.Optional(t.Union([
      t.Literal('UNIVERSITY'),
      t.Literal('COLLEGE'),
      t.Literal('INSTITUTE'),
      t.Literal('TECHNICAL_COLLEGE'),
      t.Literal('VOCATIONAL_SCHOOL'),
      t.Literal('COMMUNITY_COLLEGE')
    ])),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ])),
    search: t.Optional(t.String({ minLength: 1 }))
  })
};

export const departmentSchemas = {
  createDepartment: t.Object({
    institutionId: t.Number({ minimum: 1 }),
    name: t.String({ minLength: 1, maxLength: 255 }),
    code: t.String({ minLength: 1, maxLength: 20 }),
    faculty: t.Optional(t.String({ maxLength: 255 })),
    description: t.Optional(t.String()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  updateDepartment: t.Object({
    institutionId: t.Optional(t.Number({ minimum: 1 })),
    name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    code: t.Optional(t.String({ minLength: 1, maxLength: 20 })),
    faculty: t.Optional(t.String({ maxLength: 255 })),
    description: t.Optional(t.String()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  departmentQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    institutionId: t.Optional(t.Numeric({ minimum: 1 })),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ])),
    search: t.Optional(t.String({ minLength: 1 }))
  })
};

export const programSchemas = {
  createProgram: t.Object({
    departmentId: t.Optional(t.Number({ minimum: 1 })),
    code: t.String({ minLength: 1, maxLength: 20 }),
    name: t.String({ minLength: 1, maxLength: 255 }),
    shortName: t.Optional(t.String({ maxLength: 100 })),
    description: t.Optional(t.String()),
    level: t.Union([
      t.Literal('CERTIFICATE'),
      t.Literal('DIPLOMA'),
      t.Literal('BACHELOR'),
      t.Literal('MASTER'),
      t.Literal('DOCTORAL')
    ]),
    totalCredits: t.Number({ minimum: 1 }),
    duration: t.Optional(t.Number({ minimum: 1 })),
    programType: t.Optional(t.Union([
      t.Literal('FORMAL'),
      t.Literal('NON_FORMAL'),
      t.Literal('CONTINUING_ED'),
      t.Literal('PROFESSIONAL_DEV'),
      t.Literal('SKILL_TRAINING'),
      t.Literal('MOOC'),
      t.Literal('WORKSHOP')
    ])),
    accessLevel: t.Optional(t.Union([
      t.Literal('PUBLIC'),
      t.Literal('REGISTERED_ONLY'),
      t.Literal('RESTRICTED'),
      t.Literal('STUDENTS_ONLY'),
      t.Literal('STAFF_ONLY'),
      t.Literal('PREMIUM')
    ])),
    isFree: t.Optional(t.Boolean()),
    price: t.Optional(t.Number({ minimum: 0 })),
    minAge: t.Optional(t.Number({ minimum: 0 })),
    maxAge: t.Optional(t.Number({ minimum: 0 })),
    prerequisites: t.Optional(t.String()),
    targetAudience: t.Optional(t.String()),
    coverImage: t.Optional(t.String({ maxLength: 255 })),
    introVideo: t.Optional(t.String({ maxLength: 255 })),
    benefits: t.Optional(t.Array(t.String())),
    learningOutcomes: t.Optional(t.Array(t.String())),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  updateProgram: t.Object({
    departmentId: t.Optional(t.Number({ minimum: 1 })),
    code: t.Optional(t.String({ minLength: 1, maxLength: 20 })),
    name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    shortName: t.Optional(t.String({ maxLength: 100 })),
    description: t.Optional(t.String()),
    level: t.Optional(t.Union([
      t.Literal('CERTIFICATE'),
      t.Literal('DIPLOMA'),
      t.Literal('BACHELOR'),
      t.Literal('MASTER'),
      t.Literal('DOCTORAL')
    ])),
    totalCredits: t.Optional(t.Number({ minimum: 1 })),
    duration: t.Optional(t.Number({ minimum: 1 })),
    programType: t.Optional(t.Union([
      t.Literal('FORMAL'),
      t.Literal('NON_FORMAL'),
      t.Literal('CONTINUING_ED'),
      t.Literal('PROFESSIONAL_DEV'),
      t.Literal('SKILL_TRAINING'),
      t.Literal('MOOC'),
      t.Literal('WORKSHOP')
    ])),
    accessLevel: t.Optional(t.Union([
      t.Literal('PUBLIC'),
      t.Literal('REGISTERED_ONLY'),
      t.Literal('RESTRICTED'),
      t.Literal('STUDENTS_ONLY'),
      t.Literal('STAFF_ONLY'),
      t.Literal('PREMIUM')
    ])),
    isFree: t.Optional(t.Boolean()),
    price: t.Optional(t.Number({ minimum: 0 })),
    minAge: t.Optional(t.Number({ minimum: 0 })),
    maxAge: t.Optional(t.Number({ minimum: 0 })),
    prerequisites: t.Optional(t.String()),
    targetAudience: t.Optional(t.String()),
    coverImage: t.Optional(t.String({ maxLength: 255 })),
    introVideo: t.Optional(t.String({ maxLength: 255 })),
    benefits: t.Optional(t.Array(t.String())),
    learningOutcomes: t.Optional(t.Array(t.String())),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  programQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    departmentId: t.Optional(t.Numeric({ minimum: 1 })),
    level: t.Optional(t.Union([
      t.Literal('CERTIFICATE'),
      t.Literal('DIPLOMA'),
      t.Literal('BACHELOR'),
      t.Literal('MASTER'),
      t.Literal('DOCTORAL')
    ])),
    programType: t.Optional(t.Union([
      t.Literal('FORMAL'),
      t.Literal('NON_FORMAL'),
      t.Literal('CONTINUING_ED'),
      t.Literal('PROFESSIONAL_DEV'),
      t.Literal('SKILL_TRAINING'),
      t.Literal('MOOC'),
      t.Literal('WORKSHOP')
    ])),
    accessLevel: t.Optional(t.Union([
      t.Literal('PUBLIC'),
      t.Literal('REGISTERED_ONLY'),
      t.Literal('RESTRICTED'),
      t.Literal('STUDENTS_ONLY'),
      t.Literal('STAFF_ONLY'),
      t.Literal('PREMIUM')
    ])),
    isFree: t.Optional(t.Boolean()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ])),
    search: t.Optional(t.String({ minLength: 1 }))
  })
};

export const majorSchemas = {
  createMajor: t.Object({
    departmentId: t.Number({ minimum: 1 }),
    programId: t.Number({ minimum: 1 }),
    code: t.String({ minLength: 1, maxLength: 20 }),
    name: t.String({ minLength: 1, maxLength: 255 }),
    shortName: t.String({ minLength: 1, maxLength: 100 }),
    description: t.Optional(t.String()),
    totalCredits: t.Number({ minimum: 1 }),
    coreCredits: t.Number({ minimum: 0 }),
    electiveCredits: t.Number({ minimum: 0 }),
    accessLevel: t.Optional(t.Union([
      t.Literal('PUBLIC'),
      t.Literal('REGISTERED_ONLY'),
      t.Literal('RESTRICTED'),
      t.Literal('STUDENTS_ONLY'),
      t.Literal('STAFF_ONLY'),
      t.Literal('PREMIUM')
    ])),
    isFree: t.Optional(t.Boolean()),
    price: t.Optional(t.Number({ minimum: 0 })),
    coverImage: t.Optional(t.String({ maxLength: 255 })),
    introVideo: t.Optional(t.String({ maxLength: 255 })),
    learningOutcomes: t.Optional(t.Array(t.String())),
    careerPaths: t.Optional(t.Array(t.String())),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  updateMajor: t.Object({
    departmentId: t.Optional(t.Number({ minimum: 1 })),
    programId: t.Optional(t.Number({ minimum: 1 })),
    code: t.Optional(t.String({ minLength: 1, maxLength: 20 })),
    name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    shortName: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
    description: t.Optional(t.String()),
    totalCredits: t.Optional(t.Number({ minimum: 1 })),
    coreCredits: t.Optional(t.Number({ minimum: 0 })),
    electiveCredits: t.Optional(t.Number({ minimum: 0 })),
    accessLevel: t.Optional(t.Union([
      t.Literal('PUBLIC'),
      t.Literal('REGISTERED_ONLY'),
      t.Literal('RESTRICTED'),
      t.Literal('STUDENTS_ONLY'),
      t.Literal('STAFF_ONLY'),
      t.Literal('PREMIUM')
    ])),
    isFree: t.Optional(t.Boolean()),
    price: t.Optional(t.Number({ minimum: 0 })),
    coverImage: t.Optional(t.String({ maxLength: 255 })),
    introVideo: t.Optional(t.String({ maxLength: 255 })),
    learningOutcomes: t.Optional(t.Array(t.String())),
    careerPaths: t.Optional(t.Array(t.String())),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  majorQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    departmentId: t.Optional(t.Numeric({ minimum: 1 })),
    programId: t.Optional(t.Numeric({ minimum: 1 })),
    accessLevel: t.Optional(t.Union([
      t.Literal('PUBLIC'),
      t.Literal('REGISTERED_ONLY'),
      t.Literal('RESTRICTED'),
      t.Literal('STUDENTS_ONLY'),
      t.Literal('STAFF_ONLY'),
      t.Literal('PREMIUM')
    ])),
    isFree: t.Optional(t.Boolean()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ])),
    search: t.Optional(t.String({ minLength: 1 }))
  })
};


export const curriculumSchemas = {
  createCurriculum: t.Object({
    programId: t.Numeric({ minimum: 1 }),
    majorId: t.Numeric({ minimum: 1 }),
    name: t.String({ minLength: 1, maxLength: 255 }),
    shortName: t.Optional(t.String({ maxLength: 100 })),
    year: t.Numeric({ minimum: 1900, maximum: 4000 }),
    academicYear: t.Optional(t.Numeric({ minimum: 1900, maximum: 4000 })),
    version: t.String({ minLength: 1, maxLength: 20 }),
    totalCredits: t.Optional(t.Numeric({ minimum: 0 })),
    coreCredits: t.Optional(t.Numeric({ minimum: 0 })),
    electiveCredits: t.Optional(t.Numeric({ minimum: 0 })),
    generalCredits: t.Optional(t.Numeric({ minimum: 0 })),
    description: t.Optional(t.String()),
    coverImage: t.Optional(t.String({ maxLength: 255 })),
    coverImageFile: t.Optional(t.File()),
    introVideo: t.Optional(t.String({ maxLength: 255 })),
    startDate: t.Optional(t.Union([
      t.String({ format: 'date' }),
      t.Null()
    ])),
    endDate: t.Optional(t.Union([
      t.String({ format: 'date' }),
      t.Null()
    ])),
    // Accept boolean coming from multipart/form-data (often arrives as string)
    isActive: t.Optional(
      t.Union([
        t.Boolean(),
        t.Literal('true'),
        t.Literal('false'),
        t.Literal('1'),
        t.Literal('0')
      ])
    ),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  updateCurriculum: t.Object({
    programId: t.Optional(t.Numeric({ minimum: 1 })),
    majorId: t.Optional(t.Numeric({ minimum: 1 })),
    name: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    shortName: t.Optional(t.String({ maxLength: 100 })),
    year: t.Optional(t.Numeric({ minimum: 1900, maximum: 4000 })),
    academicYear: t.Optional(t.Numeric({ minimum: 1900, maximum: 4000 })),
    version: t.Optional(t.String({ minLength: 1, maxLength: 20 })),
    totalCredits: t.Optional(t.Numeric({ minimum: 0 })),
    coreCredits: t.Optional(t.Numeric({ minimum: 0 })),
    electiveCredits: t.Optional(t.Numeric({ minimum: 0 })),
    generalCredits: t.Optional(t.Numeric({ minimum: 0 })),
    description: t.Optional(t.String()),
    coverImage: t.Optional(t.String({ maxLength: 255 })),
    coverImageFile: t.Optional(t.File()),
    introVideo: t.Optional(t.String({ maxLength: 255 })),
    startDate: t.Optional(t.Union([
      t.String({ format: 'date' }),
      t.Null()
    ])),
    endDate: t.Optional(t.Union([
      t.String({ format: 'date' }),
      t.Null()
    ])),
    // Accept boolean coming from multipart/form-data (often arrives as string)
    isActive: t.Optional(
      t.Union([
        t.Boolean(),
        t.Literal('true'),
        t.Literal('false'),
        t.Literal('1'),
        t.Literal('0')
      ])
    ),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  curriculumQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    programId: t.Optional(t.Numeric({ minimum: 1 })),
    majorId: t.Optional(t.Numeric({ minimum: 1 })),
    year: t.Optional(t.Numeric({ minimum: 1900, maximum: 2100 })),
    academicYear: t.Optional(t.Numeric({ minimum: 1900, maximum: 2100 })),
    isActive: t.Optional(t.Boolean()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ])),
    search: t.Optional(t.String({ minLength: 1 }))
  })
};


export const subjectSchemas = {
  createSubject: t.Object({
    majorId: t.Optional(t.Number({ minimum: 1 })),
    code: t.String({ minLength: 1, maxLength: 20 }),
    title: t.String({ minLength: 1, maxLength: 255 }),
    titleEn: t.Optional(t.String({ maxLength: 255 })),
    description: t.Optional(t.String()),
    credits: t.Optional(t.Number({ minimum: 1, maximum: 20 })),
    subjectType: t.Optional(t.Union([
      t.Literal('CORE'),
      t.Literal('MAJOR'),
      t.Literal('ELECTIVE'),
      t.Literal('GENERAL_EDUCATION'),
      t.Literal('FREE_ELECTIVE'),
      t.Literal('PREREQUISITE'),
      t.Literal('SEMINAR'),
      t.Literal('INTERNSHIP'),
      t.Literal('PROJECT'),
      t.Literal('THESIS')
    ])),
    accessLevel: t.Optional(t.Union([
      t.Literal('PUBLIC'),
      t.Literal('REGISTERED_ONLY'),
      t.Literal('RESTRICTED'),
      t.Literal('STUDENTS_ONLY'),
      t.Literal('STAFF_ONLY'),
      t.Literal('PREMIUM')
    ])),
    isFree: t.Optional(t.Boolean()),
    price: t.Optional(t.Number({ minimum: 0 })),
    theoryHours: t.Optional(t.Number({ minimum: 0, maximum: 24 })),
    practiceHours: t.Optional(t.Number({ minimum: 0, maximum: 24 })),
    selfStudyHours: t.Optional(t.Number({ minimum: 0, maximum: 40 })),
    level: t.Optional(t.Number({ minimum: 1, maximum: 10 })),
    difficulty: t.Optional(t.Union([
      t.Literal('BEGINNER'),
      t.Literal('INTERMEDIATE'),
      t.Literal('ADVANCED'),
      t.Literal('EXPERT')
    ])),
    coverImage: t.Optional(t.String({ maxLength: 255 })),
    coverImageFileId: t.Optional(t.String({ maxLength: 255 })),
    introVideo: t.Optional(t.String({ maxLength: 255 })),
    videoUrl: t.Optional(t.String({ maxLength: 255 })),
    learningObjectives: t.Optional(t.Array(t.String())),
    skillsAcquired: t.Optional(t.Array(t.String())),
    prerequisites: t.Optional(t.String()),
    targetAudience: t.Optional(t.String()),
    allowAllLessons: t.Optional(t.Boolean()),
    preTestId: t.Optional(t.Number({ minimum: 1 })),
    postTestId: t.Optional(t.Number({ minimum: 1 })),
    isActive: t.Optional(t.Boolean()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  updateSubject: t.Object({
    majorId: t.Optional(t.Number({ minimum: 1 })),
    code: t.Optional(t.String({ minLength: 1, maxLength: 20 })),
    title: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    titleEn: t.Optional(t.String({ maxLength: 255 })),
    description: t.Optional(t.String()),
    credits: t.Optional(t.Number({ minimum: 1, maximum: 20 })),
    subjectType: t.Optional(t.Union([
      t.Literal('CORE'),
      t.Literal('MAJOR'),
      t.Literal('ELECTIVE'),
      t.Literal('GENERAL_EDUCATION'),
      t.Literal('FREE_ELECTIVE'),
      t.Literal('PREREQUISITE'),
      t.Literal('SEMINAR'),
      t.Literal('INTERNSHIP'),
      t.Literal('PROJECT'),
      t.Literal('THESIS')
    ])),
    accessLevel: t.Optional(t.Union([
      t.Literal('PUBLIC'),
      t.Literal('REGISTERED_ONLY'),
      t.Literal('RESTRICTED'),
      t.Literal('STUDENTS_ONLY'),
      t.Literal('STAFF_ONLY'),
      t.Literal('PREMIUM')
    ])),
    isFree: t.Optional(t.Boolean()),
    price: t.Optional(t.Number({ minimum: 0 })),
    theoryHours: t.Optional(t.Number({ minimum: 0, maximum: 24 })),
    practiceHours: t.Optional(t.Number({ minimum: 0, maximum: 24 })),
    selfStudyHours: t.Optional(t.Number({ minimum: 0, maximum: 40 })),
    level: t.Optional(t.Number({ minimum: 1, maximum: 10 })),
    difficulty: t.Optional(t.Union([
      t.Literal('BEGINNER'),
      t.Literal('INTERMEDIATE'),
      t.Literal('ADVANCED'),
      t.Literal('EXPERT')
    ])),
    coverImage: t.Optional(t.String({ maxLength: 255 })),
    coverImageFileId: t.Optional(t.String({ maxLength: 255 })),
    introVideo: t.Optional(t.String({ maxLength: 255 })),
    videoUrl: t.Optional(t.String({ maxLength: 255 })),
    learningObjectives: t.Optional(t.Array(t.String())),
    skillsAcquired: t.Optional(t.Array(t.String())),
    prerequisites: t.Optional(t.String()),
    targetAudience: t.Optional(t.String()),
    allowAllLessons: t.Optional(t.Boolean()),
    preTestId: t.Optional(t.Number({ minimum: 1 })),
    postTestId: t.Optional(t.Number({ minimum: 1 })),
    isActive: t.Optional(t.Boolean()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  subjectQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    majorId: t.Optional(t.Numeric({ minimum: 1 })),
    subjectType: t.Optional(t.Union([
      t.Literal('CORE'),
      t.Literal('MAJOR'),
      t.Literal('ELECTIVE'),
      t.Literal('GENERAL_EDUCATION'),
      t.Literal('FREE_ELECTIVE'),
      t.Literal('PREREQUISITE'),
      t.Literal('SEMINAR'),
      t.Literal('INTERNSHIP'),
      t.Literal('PROJECT'),
      t.Literal('THESIS')
    ])),
    accessLevel: t.Optional(t.Union([
      t.Literal('PUBLIC'),
      t.Literal('REGISTERED_ONLY'),
      t.Literal('RESTRICTED'),
      t.Literal('STUDENTS_ONLY'),
      t.Literal('STAFF_ONLY'),
      t.Literal('PREMIUM')
    ])),
    isFree: t.Optional(t.Boolean()),
    difficulty: t.Optional(t.Union([
      t.Literal('BEGINNER'),
      t.Literal('INTERMEDIATE'),
      t.Literal('ADVANCED'),
      t.Literal('EXPERT')
    ])),
    level: t.Optional(t.Numeric({ minimum: 1, maximum: 10 })),
    isActive: t.Optional(t.Boolean()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ])),
    search: t.Optional(t.String({ minLength: 1 }))
  })
};

export const enrollmentSchemas = {
  createEnrollment: t.Object({
    userId: t.Number({ minimum: 1 }),
    subjectId: t.Number({ minimum: 1 }),
    enrollmentType: t.Optional(t.Union([
      t.Literal('FORMAL'),
      t.Literal('AUDIT'),
      t.Literal('CONTINUING_ED'),
      t.Literal('SKILL_TRAINING'),
      t.Literal('FREE_ACCESS'),
      t.Literal('TRIAL')
    ])),
    expiryDate: t.Optional(t.String({ format: 'date' })),
    paymentRequired: t.Optional(t.Boolean()),
    paymentAmount: t.Optional(t.Number({ minimum: 0 }))
  }),

  updateEnrollment: t.Object({
    enrollmentType: t.Optional(t.Union([
      t.Literal('FORMAL'),
      t.Literal('AUDIT'),
      t.Literal('CONTINUING_ED'),
      t.Literal('SKILL_TRAINING'),
      t.Literal('FREE_ACCESS'),
      t.Literal('TRIAL')
    ])),
    completionDate: t.Optional(t.String({ format: 'date' })),
    expiryDate: t.Optional(t.String({ format: 'date' })),
    progressPercentage: t.Optional(t.Number({ minimum: 0, maximum: 100 })),
    status: t.Optional(t.Union([
      t.Literal('IN_PROGRESS'),
      t.Literal('COMPLETED'),
      t.Literal('DROPPED'),
      t.Literal('SUSPENDED')
    ])),
    paymentRequired: t.Optional(t.Boolean()),
    paymentStatus: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('PAID'),
      t.Literal('FAILED'),
      t.Literal('REFUNDED')
    ])),
    paymentAmount: t.Optional(t.Number({ minimum: 0 })),
    paymentDate: t.Optional(t.String({ format: 'date' })),
    preTestCompleted: t.Optional(t.Boolean()),
    preTestScore: t.Optional(t.Number({ minimum: 0, maximum: 100 })),
    postTestCompleted: t.Optional(t.Boolean()),
    postTestScore: t.Optional(t.Number({ minimum: 0, maximum: 100 })),
    canReceiveCertificate: t.Optional(t.Boolean()),
    certificateIssued: t.Optional(t.Boolean()),
    certificateIssuedDate: t.Optional(t.String({ format: 'date' })),
    certificateUrl: t.Optional(t.String({ maxLength: 255 })),
    finalGrade: t.Optional(t.String({ maxLength: 5 })),
    finalScore: t.Optional(t.Number({ minimum: 0, maximum: 100 })),
    credits: t.Optional(t.Number({ minimum: 0, maximum: 20 }))
  }),

  enrollmentQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    userId: t.Optional(t.Numeric({ minimum: 1 })),
    subjectId: t.Optional(t.Numeric({ minimum: 1 })),
    enrollmentType: t.Optional(t.Union([
      t.Literal('FORMAL'),
      t.Literal('AUDIT'),
      t.Literal('CONTINUING_ED'),
      t.Literal('SKILL_TRAINING'),
      t.Literal('FREE_ACCESS'),
      t.Literal('TRIAL')
    ])),
    status: t.Optional(t.Union([
      t.Literal('IN_PROGRESS'),
      t.Literal('COMPLETED'),
      t.Literal('DROPPED'),
      t.Literal('SUSPENDED')
    ])),
    paymentStatus: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('PAID'),
      t.Literal('FAILED'),
      t.Literal('REFUNDED')
    ])),
    paymentRequired: t.Optional(t.Boolean()),
    certificateIssued: t.Optional(t.Boolean()),
    startDate: t.Optional(t.String({ format: 'date' })),
    endDate: t.Optional(t.String({ format: 'date' })),
    search: t.Optional(t.String({ minLength: 1 }))
  }),

  updateProgress: t.Object({
    progressPercentage: t.Number({ minimum: 0, maximum: 100 }),
    status: t.Optional(t.Union([
      t.Literal('IN_PROGRESS'),
      t.Literal('COMPLETED'),
      t.Literal('DROPPED'),
      t.Literal('SUSPENDED')
    ]))
  }),

  updateGrade: t.Object({
    finalGrade: t.String({ minLength: 1, maxLength: 5 }),
    finalScore: t.Number({ minimum: 0, maximum: 100 }),
    credits: t.Optional(t.Number({ minimum: 0, maximum: 20 })),
    status: t.Optional(t.Union([
      t.Literal('IN_PROGRESS'),
      t.Literal('COMPLETED'),
      t.Literal('DROPPED'),
      t.Literal('SUSPENDED')
    ]))
  }),

  updatePayment: t.Object({
    paymentStatus: t.Union([
      t.Literal('PENDING'),
      t.Literal('PAID'),
      t.Literal('FAILED'),
      t.Literal('REFUNDED')
    ]),
    paymentAmount: t.Optional(t.Number({ minimum: 0 })),
    paymentDate: t.Optional(t.String({ format: 'date' }))
  }),

  updateCertificate: t.Object({
    canReceiveCertificate: t.Boolean(),
    certificateIssued: t.Optional(t.Boolean()),
    certificateIssuedDate: t.Optional(t.String({ format: 'date' })),
    certificateUrl: t.Optional(t.String({ maxLength: 255 }))
  }),

  updateTestScore: t.Object({
    testType: t.Union([
      t.Literal('preTest'),
      t.Literal('postTest')
    ]),
    completed: t.Boolean(),
    score: t.Number({ minimum: 0, maximum: 100 })
  })
};

export const certificateSchemas = {
  createCertificate: t.Object({
    userId: t.Number({ minimum: 1 }),
    subjectId: t.Optional(t.Number({ minimum: 1 })),
    programId: t.Optional(t.Number({ minimum: 1 })),
    majorId: t.Optional(t.Number({ minimum: 1 })),
    enrollmentId: t.Optional(t.Number({ minimum: 1 })),
    certificateType: t.Union([
      t.Literal('COMPLETION'),
      t.Literal('PARTICIPATION'),
      t.Literal('SKILL_BADGE'),
      t.Literal('PROFESSIONAL'),
      t.Literal('CONTINUING_ED')
    ]),
    title: t.String({ minLength: 1, maxLength: 255 }),
    description: t.Optional(t.String({ maxLength: 1000 })),
    issuedBy: t.String({ minLength: 1, maxLength: 255 }),
    issuerTitle: t.String({ minLength: 1, maxLength: 100 }),
    issuerSignature: t.Optional(t.String({ maxLength: 255 })),
    validFrom: t.String({ format: 'date' }),
    validUntil: t.Optional(t.String({ format: 'date' })),
    skills: t.Optional(t.Array(t.String({ minLength: 1, maxLength: 100 }))),
    grade: t.Optional(t.String({ maxLength: 5 })),
    score: t.Optional(t.Number({ minimum: 0, maximum: 100 })),
    creditHours: t.Optional(t.Number({ minimum: 0, maximum: 20 }))
  }),

  updateCertificate: t.Object({
    title: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    description: t.Optional(t.String({ maxLength: 1000 })),
    issuedBy: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    issuerTitle: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
    issuerSignature: t.Optional(t.String({ maxLength: 255 })),
    validFrom: t.Optional(t.String({ format: 'date' })),
    validUntil: t.Optional(t.String({ format: 'date' })),
    skills: t.Optional(t.Array(t.String({ minLength: 1, maxLength: 100 }))),
    grade: t.Optional(t.String({ maxLength: 5 })),
    score: t.Optional(t.Number({ minimum: 0, maximum: 100 })),
    creditHours: t.Optional(t.Number({ minimum: 0, maximum: 20 })),
    certificateUrl: t.Optional(t.String({ maxLength: 255 })),
    isVerified: t.Optional(t.Boolean()),
    verifiedBy: t.Optional(t.Number({ minimum: 1 })),
    verifiedDate: t.Optional(t.String({ format: 'date' })),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  certificateQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    userId: t.Optional(t.Numeric({ minimum: 1 })),
    subjectId: t.Optional(t.Numeric({ minimum: 1 })),
    programId: t.Optional(t.Numeric({ minimum: 1 })),
    majorId: t.Optional(t.Numeric({ minimum: 1 })),
    certificateType: t.Optional(t.Union([
      t.Literal('COMPLETION'),
      t.Literal('PARTICIPATION'),
      t.Literal('SKILL_BADGE'),
      t.Literal('PROFESSIONAL'),
      t.Literal('CONTINUING_ED')
    ])),
    isVerified: t.Optional(t.Boolean()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ])),
    startDate: t.Optional(t.String({ format: 'date' })),
    endDate: t.Optional(t.String({ format: 'date' })),
    search: t.Optional(t.String({ minLength: 1 }))
  }),

  generateCertificate: t.Object({
    userId: t.Number({ minimum: 1 }),
    enrollmentId: t.Number({ minimum: 1 }),
    template: t.Optional(t.String({ maxLength: 100 })),
    autoIssue: t.Optional(t.Boolean())
  }),

  bulkIssueCertificates: t.Object({
    enrollmentIds: t.Array(t.Number({ minimum: 1 }), { minItems: 1, maxItems: 100 }),
    certificateType: t.Union([
      t.Literal('COMPLETION'),
      t.Literal('PARTICIPATION'),
      t.Literal('SKILL_BADGE'),
      t.Literal('PROFESSIONAL'),
      t.Literal('CONTINUING_ED')
    ]),
    title: t.String({ minLength: 1, maxLength: 255 }),
    issuedBy: t.String({ minLength: 1, maxLength: 255 }),
    issuerTitle: t.String({ minLength: 1, maxLength: 100 }),
    template: t.Optional(t.String({ maxLength: 100 }))
  }),

  verifyCertificate: t.Object({
    certificateNumber: t.Optional(t.String({ minLength: 1, maxLength: 50 })),
    verificationCode: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
    qrCode: t.Optional(t.String({ minLength: 1 }))
  }),

  updateVerification: t.Object({
    isVerified: t.Boolean(),
    verifiedBy: t.Optional(t.Number({ minimum: 1 })),
    verifiedDate: t.Optional(t.String({ format: 'date' }))
  })
};

export const learningPathSchemas = {
  createLearningPath: t.Object({
    title: t.String({ minLength: 1, maxLength: 255 }),
    description: t.Optional(t.String({ maxLength: 1000 })),
    targetAudience: t.String({ minLength: 1, maxLength: 255 }),
    difficulty: t.Union([
      t.Literal('BEGINNER'),
      t.Literal('INTERMEDIATE'),
      t.Literal('ADVANCED'),
      t.Literal('EXPERT')
    ]),
    estimatedHours: t.Number({ minimum: 1, maximum: 1000 }),
    coverImage: t.Optional(t.String({ maxLength: 255 })),
    introVideo: t.Optional(t.String({ maxLength: 255 })),
    isFree: t.Optional(t.Boolean()),
    price: t.Optional(t.Number({ minimum: 0, maximum: 999999.99 })),
    subjects: t.Optional(t.Array(t.Object({
      subjectId: t.Number({ minimum: 1 }),
      orderNumber: t.Number({ minimum: 1, maximum: 100 }),
      isRequired: t.Optional(t.Boolean())
    }), { maxItems: 50 }))
  }),

  updateLearningPath: t.Object({
    title: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    description: t.Optional(t.String({ maxLength: 1000 })),
    targetAudience: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    difficulty: t.Optional(t.Union([
      t.Literal('BEGINNER'),
      t.Literal('INTERMEDIATE'),
      t.Literal('ADVANCED'),
      t.Literal('EXPERT')
    ])),
    estimatedHours: t.Optional(t.Number({ minimum: 1, maximum: 1000 })),
    coverImage: t.Optional(t.String({ maxLength: 255 })),
    introVideo: t.Optional(t.String({ maxLength: 255 })),
    isFree: t.Optional(t.Boolean()),
    price: t.Optional(t.Number({ minimum: 0, maximum: 999999.99 })),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  learningPathQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    difficulty: t.Optional(t.Union([
      t.Literal('BEGINNER'),
      t.Literal('INTERMEDIATE'),
      t.Literal('ADVANCED'),
      t.Literal('EXPERT')
    ])),
    isFree: t.Optional(t.Boolean()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ])),
    targetAudience: t.Optional(t.String({ minLength: 1 })),
    'priceRange.min': t.Optional(t.Numeric({ minimum: 0 })),
    'priceRange.max': t.Optional(t.Numeric({ minimum: 0 })),
    'estimatedHours.min': t.Optional(t.Numeric({ minimum: 1 })),
    'estimatedHours.max': t.Optional(t.Numeric({ minimum: 1 })),
    search: t.Optional(t.String({ minLength: 1 })),
    sortBy: t.Optional(t.Union([
      t.Literal('title'),
      t.Literal('difficulty'),
      t.Literal('estimatedHours'),
      t.Literal('price'),
      t.Literal('createdAt')
    ])),
    sortOrder: t.Optional(t.Union([
      t.Literal('asc'),
      t.Literal('desc')
    ]))
  }),

  enrollInPath: t.Object({
    userId: t.Number({ minimum: 1 }),
    learningPathId: t.Number({ minimum: 1 })
  }),

  addSubjectToPath: t.Object({
    subjectId: t.Number({ minimum: 1 }),
    orderNumber: t.Number({ minimum: 1, maximum: 100 }),
    isRequired: t.Optional(t.Boolean())
  }),

  updatePathSubject: t.Object({
    orderNumber: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
    isRequired: t.Optional(t.Boolean())
  }),

  reorderPathSubjects: t.Object({
    subjects: t.Array(t.Object({
      id: t.Number({ minimum: 1 }),
      orderNumber: t.Number({ minimum: 1, maximum: 100 })
    }), { minItems: 1, maxItems: 50 })
  }),

  updateProgress: t.Object({
    progress: t.Number({ minimum: 0, maximum: 100 }),
    status: t.Optional(t.Union([
      t.Literal('IN_PROGRESS'),
      t.Literal('COMPLETED'),
      t.Literal('DROPPED'),
      t.Literal('SUSPENDED')
    ]))
  }),

  getRecommendations: t.Object({
    userId: t.Number({ minimum: 1 }),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 20 })),
    difficulty: t.Optional(t.Union([
      t.Literal('BEGINNER'),
      t.Literal('INTERMEDIATE'),
      t.Literal('ADVANCED'),
      t.Literal('EXPERT')
    ])),
    isFree: t.Optional(t.Boolean())
  }),

  pathAnalyticsQuery: t.Object({
    pathId: t.Optional(t.Numeric({ minimum: 1 })),
    startDate: t.Optional(t.String({ format: 'date' })),
    endDate: t.Optional(t.String({ format: 'date' })),
    includeSubjects: t.Optional(t.Boolean())
  })
}; 

// ==================== Lesson System Validation Schemas ====================

export const lessonSchemas = {
  createLesson: t.Object({
    title: t.String({ minLength: 1, maxLength: 255 }),
    description: t.Optional(t.String({ maxLength: 2000 })),
    videoUrl: t.Optional(t.String({ maxLength: 255 })),
    videoFileId: t.Optional(t.String({ maxLength: 255 })),
    canPreview: t.Optional(t.Boolean()),
    hasQuiz: t.Optional(t.Boolean()),
    quizId: t.Optional(t.Number({ minimum: 1 })),
    duration: t.Optional(t.Number({ minimum: 0, maximum: 86400 })), // max 24 hours in seconds
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  updateLesson: t.Object({
    title: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    description: t.Optional(t.String({ maxLength: 2000 })),
    videoUrl: t.Optional(t.String({ maxLength: 255 })),
    videoFileId: t.Optional(t.String({ maxLength: 255 })),
    canPreview: t.Optional(t.Boolean()),
    hasQuiz: t.Optional(t.Boolean()),
    quizId: t.Optional(t.Number({ minimum: 1 })),
    duration: t.Optional(t.Number({ minimum: 0, maximum: 86400 })),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  lessonQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    subjectId: t.Optional(t.Numeric({ minimum: 1 })),
    sectionId: t.Optional(t.Numeric({ minimum: 1 })),
    hasQuiz: t.Optional(t.Boolean()),
    canPreview: t.Optional(t.Boolean()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ])),
    createdBy: t.Optional(t.Numeric({ minimum: 1 })),
    search: t.Optional(t.String({ minLength: 1 })),
    sortBy: t.Optional(t.Union([
      t.Literal('title'),
      t.Literal('duration'),
      t.Literal('createdAt'),
      t.Literal('updatedAt')
    ])),
    sortOrder: t.Optional(t.Union([
      t.Literal('asc'),
      t.Literal('desc')
    ]))
  }),

  addLessonToSubject: t.Object({
    subjectId: t.Number({ minimum: 1 }),
    lessonId: t.Number({ minimum: 1 }),
    orderNumber: t.Optional(t.Number({ minimum: 1, maximum: 1000 }))
  }),

  reorderLessons: t.Object({
    lessons: t.Array(t.Object({
      lessonId: t.Number({ minimum: 1 }),
      orderNumber: t.Number({ minimum: 1, maximum: 1000 })
    }), { minItems: 1, maxItems: 100 })
  })
};

export const quizSchemas = {
  createQuiz: t.Object({
    title: t.String({ minLength: 1, maxLength: 255 }),
    description: t.Optional(t.String({ maxLength: 2000 })),
    type: t.Optional(t.String({ maxLength: 50 })),
    timeLimitEnabled: t.Optional(t.Boolean()),
    timeLimitValue: t.Optional(t.Number({ minimum: 1, maximum: 1440 })), // max 24 hours in minutes
    timeLimitUnit: t.Optional(t.String({ maxLength: 10 })),
    passingScoreEnabled: t.Optional(t.Boolean()),
    passingScoreValue: t.Optional(t.Number({ minimum: 0, maximum: 100 })),
    attemptsLimited: t.Optional(t.Boolean()),
    attemptsUnlimited: t.Optional(t.Boolean()),
    attemptsValue: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ])),
    questions: t.Optional(t.Array(t.Object({
      title: t.String({ minLength: 1, maxLength: 255 }),
      description: t.Optional(t.String({ maxLength: 1000 })),
      questionText: t.Optional(t.String({ maxLength: 2000 })),
      type: t.Union([
        t.Literal('MULTIPLE_CHOICE'),
        t.Literal('TRUE_FALSE'),
        t.Literal('SHORT_ANSWER'),
        t.Literal('ESSAY'),
        t.Literal('FILL_IN_BLANK'),
        t.Literal('MATCHING'),
        t.Literal('ORDERING')
      ]),
      score: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
      choices: t.Optional(t.Array(t.Object({
        text: t.String({ minLength: 1, maxLength: 500 }),
        isCorrect: t.Boolean()
      }), { minItems: 1, maxItems: 10 }))
    }), { maxItems: 100 }))
  }),

  updateQuiz: t.Object({
    title: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    description: t.Optional(t.String({ maxLength: 2000 })),
    type: t.Optional(t.String({ maxLength: 50 })),
    timeLimitEnabled: t.Optional(t.Boolean()),
    timeLimitValue: t.Optional(t.Number({ minimum: 1, maximum: 1440 })),
    timeLimitUnit: t.Optional(t.String({ maxLength: 10 })),
    passingScoreEnabled: t.Optional(t.Boolean()),
    passingScoreValue: t.Optional(t.Number({ minimum: 0, maximum: 100 })),
    attemptsLimited: t.Optional(t.Boolean()),
    attemptsUnlimited: t.Optional(t.Boolean()),
    attemptsValue: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),

  quizQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    type: t.Optional(t.String({ maxLength: 50 })),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ])),
    timeLimitEnabled: t.Optional(t.Boolean()),
    passingScoreEnabled: t.Optional(t.Boolean()),
    createdBy: t.Optional(t.String({ minLength: 1 })),
    search: t.Optional(t.String({ minLength: 1 })),
    sortBy: t.Optional(t.Union([
      t.Literal('title'),
      t.Literal('createdAt'),
      t.Literal('updatedAt')
    ])),
    sortOrder: t.Optional(t.Union([
      t.Literal('asc'),
      t.Literal('desc')
    ]))
  }),

  startQuizAttempt: t.Object({
    quizId: t.Number({ minimum: 1 }),
    userId: t.Number({ minimum: 1 })
  }),

  submitQuizAnswer: t.Object({
    attemptId: t.Number({ minimum: 1 }),
    questionId: t.Number({ minimum: 1 }),
    choiceId: t.Optional(t.Number({ minimum: 1 })),
    textAnswer: t.Optional(t.String({ maxLength: 2000 }))
  }),

  completeQuizAttempt: t.Object({
    attemptId: t.Number({ minimum: 1 })
  }),

  addQuestionToQuiz: t.Object({
    quizId: t.Number({ minimum: 1 }),
    questionId: t.Number({ minimum: 1 })
  }),

  removeQuestionFromQuiz: t.Object({
    quizId: t.Number({ minimum: 1 }),
    questionId: t.Number({ minimum: 1 })
  })
};

export const questionSchemas = {
  createQuestion: t.Object({
    title: t.String({ minLength: 1, maxLength: 255 }),
    description: t.Optional(t.String({ maxLength: 1000 })),
    questionText: t.Optional(t.String({ maxLength: 2000 })),
    type: t.Union([
      t.Literal('MULTIPLE_CHOICE'),
      t.Literal('TRUE_FALSE'),
      t.Literal('SHORT_ANSWER'),
      t.Literal('ESSAY'),
      t.Literal('FILL_IN_BLANK'),
      t.Literal('MATCHING'),
      t.Literal('ORDERING')
    ]),
    score: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
    choices: t.Optional(t.Array(t.Object({
      text: t.String({ minLength: 1, maxLength: 500 }),
      isCorrect: t.Boolean()
    }), { minItems: 1, maxItems: 10 }))
  }),

  updateQuestion: t.Object({
    title: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    description: t.Optional(t.String({ maxLength: 1000 })),
    questionText: t.Optional(t.String({ maxLength: 2000 })),
    type: t.Optional(t.Union([
      t.Literal('MULTIPLE_CHOICE'),
      t.Literal('TRUE_FALSE'),
      t.Literal('SHORT_ANSWER'),
      t.Literal('ESSAY'),
      t.Literal('FILL_IN_BLANK'),
      t.Literal('MATCHING'),
      t.Literal('ORDERING')
    ])),
    score: t.Optional(t.Number({ minimum: 1, maximum: 100 }))
  }),

  questionQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    type: t.Optional(t.Union([
      t.Literal('MULTIPLE_CHOICE'),
      t.Literal('TRUE_FALSE'),
      t.Literal('SHORT_ANSWER'),
      t.Literal('ESSAY'),
      t.Literal('FILL_IN_BLANK'),
      t.Literal('MATCHING'),
      t.Literal('ORDERING')
    ])),
    quizId: t.Optional(t.Numeric({ minimum: 1 })),
    search: t.Optional(t.String({ minLength: 1 }))
  }),

  addChoiceToQuestion: t.Object({
    questionId: t.Number({ minimum: 1 }),
    text: t.String({ minLength: 1, maxLength: 500 }),
    isCorrect: t.Boolean()
  }),

  updateChoice: t.Object({
    text: t.Optional(t.String({ minLength: 1, maxLength: 500 })),
    isCorrect: t.Optional(t.Boolean())
  })
};

export const lessonSectionSchemas = {
  createLessonSection: t.Object({
    title: t.String({ minLength: 1, maxLength: 255 }),
    subjectId: t.Optional(t.Number({ minimum: 1 })),
    orderNumber: t.Optional(t.Number({ minimum: 1, maximum: 1000 }))
  }),

  updateLessonSection: t.Object({
    title: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    subjectId: t.Optional(t.Number({ minimum: 1 })),
    orderNumber: t.Optional(t.Number({ minimum: 1, maximum: 1000 }))
  }),

  lessonSectionQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    subjectId: t.Optional(t.Numeric({ minimum: 1 })),
    search: t.Optional(t.String({ minLength: 1 })),
    sortBy: t.Optional(t.Union([
      t.Literal('title'),
      t.Literal('orderNumber'),
      t.Literal('createdAt')
    ])),
    sortOrder: t.Optional(t.Union([
      t.Literal('asc'),
      t.Literal('desc')
    ]))
  }),

  addLessonToSection: t.Object({
    sectionId: t.Number({ minimum: 1 }),
    lessonId: t.Number({ minimum: 1 }),
    orderNumber: t.Optional(t.Number({ minimum: 1, maximum: 1000 }))
  }),

  reorderSectionLessons: t.Object({
    lessons: t.Array(t.Object({
      lessonId: t.Number({ minimum: 1 }),
      orderNumber: t.Number({ minimum: 1, maximum: 1000 })
    }), { minItems: 1, maxItems: 100 })
  })
};

export const progressSchemas = {
  updateLessonProgress: t.Object({
    lessonId: t.Number({ minimum: 1 }),
    userId: t.Number({ minimum: 1 }),
    completed: t.Optional(t.Boolean()),
    durationSeconds: t.Optional(t.Number({ minimum: 0, maximum: 86400 })),
    lastPositionSeconds: t.Optional(t.Number({ minimum: 0, maximum: 86400 })),
    videoCompleted: t.Optional(t.Boolean()),
    quizCompleted: t.Optional(t.Boolean())
  }),

  updateVideoProgress: t.Object({
    lessonId: t.Number({ minimum: 1 }),
    userId: t.Number({ minimum: 1 }),
    currentTime: t.Number({ minimum: 0, maximum: 86400 }),
    duration: t.Number({ minimum: 0, maximum: 86400 }),
    completed: t.Optional(t.Boolean()),
    watchedPercentage: t.Optional(t.Number({ minimum: 0, maximum: 100 }))
  }),

  progressQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    userId: t.Optional(t.Numeric({ minimum: 1 })),
    lessonId: t.Optional(t.Numeric({ minimum: 1 })),
    subjectId: t.Optional(t.Numeric({ minimum: 1 })),
    completed: t.Optional(t.Boolean()),
    dateFrom: t.Optional(t.String({ format: 'date' })),
    dateTo: t.Optional(t.String({ format: 'date' }))
  }),

  bulkProgressUpdate: t.Object({
    userId: t.Number({ minimum: 1 }),
    updates: t.Array(t.Object({
      lessonId: t.Number({ minimum: 1 }),
      completed: t.Optional(t.Boolean()),
      durationSeconds: t.Optional(t.Number({ minimum: 0, maximum: 86400 })),
      lastPositionSeconds: t.Optional(t.Number({ minimum: 0, maximum: 86400 })),
      videoCompleted: t.Optional(t.Boolean()),
      quizCompleted: t.Optional(t.Boolean())
    }), { minItems: 1, maxItems: 100 })
  }),

  lessonAnalyticsQuery: t.Object({
    lessonId: t.Optional(t.Numeric({ minimum: 1 })),
    startDate: t.Optional(t.String({ format: 'date' })),
    endDate: t.Optional(t.String({ format: 'date' })),
    includeUserDetails: t.Optional(t.Boolean())
  }),

  userProgressQuery: t.Object({
    userId: t.Number({ minimum: 1 }),
    subjectId: t.Optional(t.Numeric({ minimum: 1 })),
    includeDetails: t.Optional(t.Boolean()),
    dateFrom: t.Optional(t.String({ format: 'date' })),
    dateTo: t.Optional(t.String({ format: 'date' }))
  })
};

export const creditRecordSchemas = {
  createCreditRecord: t.Object({
    userId: t.Number({ minimum: 1 }),
    subjectId: t.Optional(t.Number({ minimum: 1 })),
    credits: t.Number({ minimum: 1, maximum: 20 }),
    grade: t.Optional(t.String({ minLength: 1, maxLength: 5 })),
    gradePoint: t.Optional(t.Number({ minimum: 0, maximum: 4 })),
    source: t.Union([
      t.Literal('COURSE_COMPLETION'),
      t.Literal('EXAM'),
      t.Literal('MOOC'),
      t.Literal('EXTERNAL_INSTITUTION'),
      t.Literal('WORK_EXPERIENCE'),
      t.Literal('PORTFOLIO')
    ]),
    sourceDetails: t.Optional(t.String({ maxLength: 500 })),
    academicYear: t.String({ minLength: 4, maxLength: 10 }),
    semester: t.Number({ minimum: 1, maximum: 3 }),
    earnedDate: t.String({ format: 'date' }),
    verifiedBy: t.Optional(t.Number({ minimum: 1 })),
    verificationDate: t.Optional(t.String({ format: 'date' })),
    status: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('VERIFIED'),
      t.Literal('REJECTED'),
      t.Literal('TRANSFERRED')
    ])),
    certificateUrl: t.Optional(t.String({ maxLength: 500 }))
  }),

  updateCreditRecord: t.Object({
    subjectId: t.Optional(t.Number({ minimum: 1 })),
    credits: t.Optional(t.Number({ minimum: 1, maximum: 20 })),
    grade: t.Optional(t.String({ minLength: 1, maxLength: 5 })),
    gradePoint: t.Optional(t.Number({ minimum: 0, maximum: 4 })),
    source: t.Optional(t.Union([
      t.Literal('COURSE_COMPLETION'),
      t.Literal('EXAM'),
      t.Literal('MOOC'),
      t.Literal('EXTERNAL_INSTITUTION'),
      t.Literal('WORK_EXPERIENCE'),
      t.Literal('PORTFOLIO')
    ])),
    sourceDetails: t.Optional(t.String({ maxLength: 500 })),
    academicYear: t.Optional(t.String({ minLength: 4, maxLength: 10 })),
    semester: t.Optional(t.Number({ minimum: 1, maximum: 3 })),
    earnedDate: t.Optional(t.String({ format: 'date' })),
    verifiedBy: t.Optional(t.Number({ minimum: 1 })),
    verificationDate: t.Optional(t.String({ format: 'date' })),
    status: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('VERIFIED'),
      t.Literal('REJECTED'),
      t.Literal('TRANSFERRED')
    ])),
    certificateUrl: t.Optional(t.String({ maxLength: 500 }))
  }),

  creditRecordQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    userId: t.Optional(t.Numeric({ minimum: 1 })),
    subjectId: t.Optional(t.Numeric({ minimum: 1 })),
    source: t.Optional(t.Union([
      t.Literal('COURSE_COMPLETION'),
      t.Literal('EXAM'),
      t.Literal('MOOC'),
      t.Literal('EXTERNAL_INSTITUTION'),
      t.Literal('WORK_EXPERIENCE'),
      t.Literal('PORTFOLIO')
    ])),
    status: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('VERIFIED'),
      t.Literal('REJECTED'),
      t.Literal('TRANSFERRED')
    ])),
    academicYear: t.Optional(t.String({ minLength: 4, maxLength: 10 })),
    semester: t.Optional(t.Numeric({ minimum: 1, maximum: 3 })),
    minCredits: t.Optional(t.Numeric({ minimum: 1 })),
    maxCredits: t.Optional(t.Numeric({ minimum: 1 })),
    grade: t.Optional(t.String({ minLength: 1, maxLength: 5 })),
    verifiedBy: t.Optional(t.Numeric({ minimum: 1 })),
    dateFrom: t.Optional(t.String({ format: 'date' })),
    dateTo: t.Optional(t.String({ format: 'date' })),
    search: t.Optional(t.String({ minLength: 1 })),
    sortBy: t.Optional(t.Union([
      t.Literal('earnedDate'),
      t.Literal('credits'),
      t.Literal('grade'),
      t.Literal('verificationDate'),
      t.Literal('createdAt')
    ])),
    sortOrder: t.Optional(t.Union([t.Literal('asc'), t.Literal('desc')]))
  }),

  verifyCreditRecord: t.Object({
    status: t.Union([
      t.Literal('VERIFIED'),
      t.Literal('REJECTED')
    ]),
    verifiedBy: t.Number({ minimum: 1 }),
    verificationDate: t.Optional(t.String({ format: 'date' })),
    remarks: t.Optional(t.String({ maxLength: 500 }))
  }),

  bulkUpdateCreditRecords: t.Object({
    recordIds: t.Array(t.Number({ minimum: 1 }), { minItems: 1 }),
    updates: t.Object({
      status: t.Optional(t.Union([
        t.Literal('PENDING'),
        t.Literal('VERIFIED'),
        t.Literal('REJECTED'),
        t.Literal('TRANSFERRED')
      ])),
      verifiedBy: t.Optional(t.Number({ minimum: 1 })),
      verificationDate: t.Optional(t.String({ format: 'date' })),
      remarks: t.Optional(t.String({ maxLength: 500 }))
    })
  }),

  generateTranscript: t.Object({
    userId: t.Number({ minimum: 1 }),
    includeAll: t.Optional(t.Boolean()),
    academicYears: t.Optional(t.Array(t.String({ minLength: 4, maxLength: 10 }))),
    status: t.Optional(t.Array(t.Union([
      t.Literal('PENDING'),
      t.Literal('VERIFIED'),
      t.Literal('REJECTED'),
      t.Literal('TRANSFERRED')
    ])))
  })
};

export const creditTransferSchemas = {
  createCreditTransfer: t.Object({
    userId: t.Number({ minimum: 1 }),
    fromInstitution: t.String({ minLength: 1, maxLength: 255 }),
    fromSubjectCode: t.String({ minLength: 1, maxLength: 50 }),
    fromSubjectName: t.String({ minLength: 1, maxLength: 255 }),
    fromCredits: t.Number({ minimum: 1, maximum: 20 }),
    fromGrade: t.Optional(t.String({ maxLength: 5 })),
    toSubjectId: t.Optional(t.Number({ minimum: 1 })),
    equivalentCredits: t.Number({ minimum: 1, maximum: 20 }),
    conversionRate: t.Optional(t.Number({ minimum: 0.1, maximum: 2.0 })),
    documents: t.Optional(t.Array(t.String())),
    remarks: t.Optional(t.String({ maxLength: 1000 })),
    status: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('APPROVED'),
      t.Literal('REJECTED'),
      t.Literal('PROCESSING')
    ]))
  }),

  updateCreditTransfer: t.Object({
    fromInstitution: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    fromSubjectCode: t.Optional(t.String({ minLength: 1, maxLength: 50 })),
    fromSubjectName: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    fromCredits: t.Optional(t.Number({ minimum: 1, maximum: 20 })),
    fromGrade: t.Optional(t.String({ maxLength: 5 })),
    toSubjectId: t.Optional(t.Number({ minimum: 1 })),
    equivalentCredits: t.Optional(t.Number({ minimum: 1, maximum: 20 })),
    conversionRate: t.Optional(t.Number({ minimum: 0.1, maximum: 2.0 })),
    documents: t.Optional(t.Array(t.String())),
    remarks: t.Optional(t.String({ maxLength: 1000 })),
    status: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('APPROVED'),
      t.Literal('REJECTED'),
      t.Literal('PROCESSING')
    ]))
  }),

  creditTransferQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, maximum: 100 })),
    userId: t.Optional(t.Numeric({ minimum: 1 })),
    fromInstitution: t.Optional(t.String({ minLength: 1 })),
    toSubjectId: t.Optional(t.Numeric({ minimum: 1 })),
    status: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('APPROVED'),
      t.Literal('REJECTED'),
      t.Literal('PROCESSING')
    ])),
    approvedBy: t.Optional(t.Numeric({ minimum: 1 })),
    minCredits: t.Optional(t.Numeric({ minimum: 1 })),
    maxCredits: t.Optional(t.Numeric({ minimum: 1 })),
    minEquivalentCredits: t.Optional(t.Numeric({ minimum: 1 })),
    maxEquivalentCredits: t.Optional(t.Numeric({ minimum: 1 })),
    fromGrade: t.Optional(t.String({ maxLength: 5 })),
    dateFrom: t.Optional(t.String({ format: 'date' })),
    dateTo: t.Optional(t.String({ format: 'date' })),
    approvedDateFrom: t.Optional(t.String({ format: 'date' })),
    approvedDateTo: t.Optional(t.String({ format: 'date' })),
    search: t.Optional(t.String({ minLength: 1 })),
    sortBy: t.Optional(t.Union([
      t.Literal('fromInstitution'),
      t.Literal('fromCredits'),
      t.Literal('equivalentCredits'),
      t.Literal('status'),
      t.Literal('createdAt'),
      t.Literal('approvedDate')
    ])),
    sortOrder: t.Optional(t.Union([
      t.Literal('asc'),
      t.Literal('desc')
    ]))
  }),

  approveCreditTransfer: t.Object({
    id: t.Number({ minimum: 1 }),
    approvedBy: t.Number({ minimum: 1 }),
    approvedDate: t.String({ format: 'date-time' }),
    status: t.Union([
      t.Literal('APPROVED'),
      t.Literal('REJECTED'),
      t.Literal('PROCESSING')
    ]),
    equivalentCredits: t.Optional(t.Number({ minimum: 1, maximum: 20 })),
    conversionRate: t.Optional(t.Number({ minimum: 0.1, maximum: 2.0 })),
    toSubjectId: t.Optional(t.Number({ minimum: 1 })),
    remarks: t.Optional(t.String({ maxLength: 1000 }))
  }),

  bulkUpdateCreditTransfers: t.Object({
    transferIds: t.Array(t.Number({ minimum: 1 }), { minItems: 1, maxItems: 100 }),
    updates: t.Object({
      status: t.Optional(t.Union([
        t.Literal('PENDING'),
        t.Literal('APPROVED'),
        t.Literal('REJECTED'),
        t.Literal('PROCESSING')
      ])),
      approvedBy: t.Optional(t.Number({ minimum: 1 })),
      approvedDate: t.Optional(t.String({ format: 'date-time' })),
      equivalentCredits: t.Optional(t.Number({ minimum: 1, maximum: 20 })),
      conversionRate: t.Optional(t.Number({ minimum: 0.1, maximum: 2.0 })),
      toSubjectId: t.Optional(t.Number({ minimum: 1 })),
      remarks: t.Optional(t.String({ maxLength: 1000 }))
    })
  }),

  transferValidation: t.Object({
    fromInstitution: t.String({ minLength: 1, maxLength: 255 }),
    fromSubjectCode: t.String({ minLength: 1, maxLength: 50 }),
    fromSubjectName: t.String({ minLength: 1, maxLength: 255 }),
    fromCredits: t.Number({ minimum: 1, maximum: 20 }),
    toSubjectId: t.Optional(t.Number({ minimum: 1 }))
  }),

  transferReport: t.Object({
    reportType: t.Union([
      t.Literal('INDIVIDUAL'),
      t.Literal('INSTITUTIONAL'),
      t.Literal('SYSTEM_WIDE')
    ]),
    generatedFor: t.Optional(t.Number({ minimum: 1 })),
    institution: t.Optional(t.String({ minLength: 1 })),
    dateFrom: t.String({ format: 'date' }),
    dateTo: t.String({ format: 'date' }),
    includeDetails: t.Optional(t.Boolean()),
    format: t.Optional(t.Union([
      t.Literal('JSON'),
      t.Literal('PDF'),
      t.Literal('CSV'),
      t.Literal('EXCEL')
    ]))
  })
};

export const transcriptRequestSchemas = {
  createTranscriptRequest: t.Object({
    userId: t.Number({ minimum: 1 }),
    requestType: t.Union([
      t.Literal('OFFICIAL'),
      t.Literal('UNOFFICIAL'),
      t.Literal('DIGITAL'),
      t.Literal('PARTIAL')
    ]),
    purpose: t.String({ minLength: 1, maxLength: 255 }),
    recipientName: t.Optional(t.String({ maxLength: 255 })),
    recipientAddress: t.Optional(t.String({ maxLength: 1000 })),
    deliveryMethod: t.Union([
      t.Literal('EMAIL'),
      t.Literal('POSTAL_MAIL'),
      t.Literal('PICKUP'),
      t.Literal('DIGITAL_DOWNLOAD')
    ]),
    urgentRequest: t.Optional(t.Boolean()),
    fee: t.Optional(t.Number({ minimum: 0 })),
    paymentStatus: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('PAID'),
      t.Literal('FAILED'),
      t.Literal('REFUNDED')
    ]))
  }),

  updateTranscriptRequest: t.Object({
    requestType: t.Optional(t.Union([
      t.Literal('OFFICIAL'),
      t.Literal('UNOFFICIAL'),
      t.Literal('DIGITAL'),
      t.Literal('PARTIAL')
    ])),
    purpose: t.Optional(t.String({ minLength: 1, maxLength: 255 })),
    recipientName: t.Optional(t.String({ maxLength: 255 })),
    recipientAddress: t.Optional(t.String({ maxLength: 1000 })),
    deliveryMethod: t.Optional(t.Union([
      t.Literal('EMAIL'),
      t.Literal('POSTAL_MAIL'),
      t.Literal('PICKUP'),
      t.Literal('DIGITAL_DOWNLOAD')
    ])),
    urgentRequest: t.Optional(t.Boolean()),
    fee: t.Optional(t.Number({ minimum: 0 })),
    paymentStatus: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('PAID'),
      t.Literal('FAILED'),
      t.Literal('REFUNDED')
    ])),
    processedBy: t.Optional(t.Number({ minimum: 1 })),
    processedDate: t.Optional(t.String({ format: 'date-time' })),
    status: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('PROCESSING'),
      t.Literal('COMPLETED'),
      t.Literal('CANCELLED')
    ])),
    documentUrl: t.Optional(t.String({ format: 'uri', maxLength: 500 })),
    trackingNumber: t.Optional(t.String({ maxLength: 50 }))
  }),

  transcriptRequestQuery: t.Object({
    page: t.Optional(t.Number({ minimum: 1 })),
    limit: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
    userId: t.Optional(t.Number({ minimum: 1 })),
    requestType: t.Optional(t.Union([
      t.Literal('OFFICIAL'),
      t.Literal('UNOFFICIAL'),
      t.Literal('DIGITAL'),
      t.Literal('PARTIAL')
    ])),
    deliveryMethod: t.Optional(t.Union([
      t.Literal('EMAIL'),
      t.Literal('POSTAL_MAIL'),
      t.Literal('PICKUP'),
      t.Literal('DIGITAL_DOWNLOAD')
    ])),
    urgentRequest: t.Optional(t.Boolean()),
    paymentStatus: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('PAID'),
      t.Literal('FAILED'),
      t.Literal('REFUNDED')
    ])),
    status: t.Optional(t.Union([
      t.Literal('PENDING'),
      t.Literal('PROCESSING'),
      t.Literal('COMPLETED'),
      t.Literal('CANCELLED')
    ])),
    processedBy: t.Optional(t.Number({ minimum: 1 })),
    minFee: t.Optional(t.Number({ minimum: 0 })),
    maxFee: t.Optional(t.Number({ minimum: 0 })),
    dateFrom: t.Optional(t.String({ format: 'date' })),
    dateTo: t.Optional(t.String({ format: 'date' })),
    processedDateFrom: t.Optional(t.String({ format: 'date' })),
    processedDateTo: t.Optional(t.String({ format: 'date' })),
    search: t.Optional(t.String({ maxLength: 100 })),
    sortBy: t.Optional(t.Union([
      t.Literal('requestType'),
      t.Literal('purpose'),
      t.Literal('fee'),
      t.Literal('status'),
      t.Literal('createdAt'),
      t.Literal('processedDate')
    ])),
    sortOrder: t.Optional(t.Union([
      t.Literal('asc'),
      t.Literal('desc')
    ]))
  }),

  processTranscriptRequest: t.Object({
    processedBy: t.Number({ minimum: 1 }),
    processedDate: t.String({ format: 'date-time' }),
    status: t.Union([
      t.Literal('PROCESSING'),
      t.Literal('COMPLETED'),
      t.Literal('CANCELLED')
    ]),
    documentUrl: t.Optional(t.String({ format: 'uri', maxLength: 500 })),
    trackingNumber: t.Optional(t.String({ maxLength: 50 })),
    remarks: t.Optional(t.String({ maxLength: 1000 }))
  }),

  bulkUpdateTranscriptRequests: t.Object({
    requestIds: t.Array(t.Number({ minimum: 1 }), { minItems: 1, maxItems: 100 }),
    updates: t.Object({
      status: t.Optional(t.Union([
        t.Literal('PENDING'),
        t.Literal('PROCESSING'),
        t.Literal('COMPLETED'),
        t.Literal('CANCELLED')
      ])),
      processedBy: t.Optional(t.Number({ minimum: 1 })),
      processedDate: t.Optional(t.String({ format: 'date-time' })),
      documentUrl: t.Optional(t.String({ format: 'uri', maxLength: 500 })),
      paymentStatus: t.Optional(t.Union([
        t.Literal('PENDING'),
        t.Literal('PAID'),
        t.Literal('FAILED'),
        t.Literal('REFUNDED')
      ])),
      remarks: t.Optional(t.String({ maxLength: 1000 }))
    })
  }),

  validateTranscriptRequest: t.Object({
    userId: t.Number({ minimum: 1 }),
    requestType: t.Union([
      t.Literal('OFFICIAL'),
      t.Literal('UNOFFICIAL'),
      t.Literal('DIGITAL'),
      t.Literal('PARTIAL')
    ]),
    purpose: t.String({ minLength: 1, maxLength: 255 }),
    deliveryMethod: t.Union([
      t.Literal('EMAIL'),
      t.Literal('POSTAL_MAIL'),
      t.Literal('PICKUP'),
      t.Literal('DIGITAL_DOWNLOAD')
    ]),
    urgentRequest: t.Optional(t.Boolean())
  }),

  generateReport: t.Object({
    reportType: t.Union([
      t.Literal('INDIVIDUAL'),
      t.Literal('INSTITUTIONAL'),
      t.Literal('SYSTEM_WIDE'),
      t.Literal('FINANCIAL')
    ]),
    generatedFor: t.Optional(t.Number({ minimum: 1 })),
    dateFrom: t.String({ format: 'date' }),
    dateTo: t.String({ format: 'date' }),
    includeFinancialBreakdown: t.Optional(t.Boolean())
  })
};

// ==================== STUDENT SCHEMAS ====================

export const studentSchemas = {
  createStudent: t.Object({
    userId: t.Number({ minimum: 1 }),
    studentCode: t.Optional(t.String({ minLength: 1, maxLength: 20 })),
    departmentId: t.Optional(t.Number({ minimum: 1 })),
    programId: t.Optional(t.Number({ minimum: 1 })),
    majorId: t.Optional(t.Number({ minimum: 1 })),
    curriculumId: t.Optional(t.Number({ minimum: 1 })),
    admissionYear: t.Optional(t.Number({ minimum: 1900, maximum: 2100 })),
    yearOfStudy: t.Optional(t.Number({ minimum: 1, maximum: 10 })),
    semester: t.Optional(t.Number({ minimum: 1, maximum: 3 })),
    gpa: t.Optional(t.Number({ minimum: 0, maximum: 4 })),
    totalCredits: t.Optional(t.Number({ minimum: 0 })),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'), 
      t.Literal('GRADUATED'),
      t.Literal('DROPPED'),
      t.Literal('SUSPENDED')
    ]))
  }),

  updateStudent: t.Object({
    studentCode: t.Optional(t.String({ minLength: 1, maxLength: 20 })),
    departmentId: t.Optional(t.Number({ minimum: 1 })),
    programId: t.Optional(t.Number({ minimum: 1 })),
    majorId: t.Optional(t.Number({ minimum: 1 })),
    curriculumId: t.Optional(t.Number({ minimum: 1 })),
    admissionYear: t.Optional(t.Number({ minimum: 1900, maximum: 2100 })),
    yearOfStudy: t.Optional(t.Number({ minimum: 1, maximum: 10 })),
    semester: t.Optional(t.Number({ minimum: 1, maximum: 3 })),
    gpa: t.Optional(t.Number({ minimum: 0, maximum: 4 })),
    totalCredits: t.Optional(t.Number({ minimum: 0 })),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('GRADUATED'),
      t.Literal('DROPPED'),
      t.Literal('SUSPENDED')
    ]))
  }),

  studentQuery: t.Object({
    page: t.Optional(t.Number({ minimum: 1 })),
    limit: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
    departmentId: t.Optional(t.Number({ minimum: 1 })),
    programId: t.Optional(t.Number({ minimum: 1 })),
    majorId: t.Optional(t.Number({ minimum: 1 })),
    curriculumId: t.Optional(t.Number({ minimum: 1 })),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('GRADUATED'),
      t.Literal('DROPPED'),
      t.Literal('SUSPENDED')
    ])),
    admissionYear: t.Optional(t.Number({ minimum: 1900, maximum: 2100 })),
    yearOfStudy: t.Optional(t.Number({ minimum: 1, maximum: 10 })),
    semester: t.Optional(t.Number({ minimum: 1, maximum: 3 })),
    gpaMin: t.Optional(t.Number({ minimum: 0, maximum: 4 })),
    gpaMax: t.Optional(t.Number({ minimum: 0, maximum: 4 })),
    creditsMin: t.Optional(t.Number({ minimum: 0 })),
    creditsMax: t.Optional(t.Number({ minimum: 0 })),
    search: t.Optional(t.String({ maxLength: 100 })),
    sortBy: t.Optional(t.Union([
      t.Literal('studentCode'),
      t.Literal('gpa'),
      t.Literal('totalCredits'),
      t.Literal('admissionYear'),
      t.Literal('yearOfStudy'),
      t.Literal('createdAt')
    ])),
    sortOrder: t.Optional(t.Union([
      t.Literal('asc'),
      t.Literal('desc')
    ]))
  })
};

// ==================== ADMIN SCHEMAS ====================

export const adminSchemas = {
  createAdmin: t.Object({
    userId: t.Number({ minimum: 1 }),
    departmentId: t.Optional(t.Number({ minimum: 1 })),
    position: t.Optional(t.String({ minLength: 1, maxLength: 100 }))
  }),

  updateAdmin: t.Object({
    departmentId: t.Optional(t.Number({ minimum: 1 })),
    position: t.Optional(t.String({ minLength: 1, maxLength: 100 }))
  }),

  adminQuery: t.Object({
    page: t.Optional(t.Number({ minimum: 1 })),
    limit: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
    departmentId: t.Optional(t.Number({ minimum: 1 })),
    position: t.Optional(t.String({ maxLength: 100 })),
    search: t.Optional(t.String({ maxLength: 100 })),
    sortBy: t.Optional(t.Union([
      t.Literal('position'),
      t.Literal('createdAt')
    ])),
    sortOrder: t.Optional(t.Union([
      t.Literal('asc'),
      t.Literal('desc')
    ]))
  })
};

// ==================== ACADEMIC YEAR SCHEMAS ====================

export const academicYearSchemas = {
  createAcademicYear: t.Object({
    year: t.String({ minLength: 4, maxLength: 10 }),
    startDate: t.String({ format: 'date' }),
    endDate: t.String({ format: 'date' }),
    isActive: t.Optional(t.Boolean())
  }),

  updateAcademicYear: t.Object({
    year: t.Optional(t.String({ minLength: 4, maxLength: 10 })),
    startDate: t.Optional(t.String({ format: 'date' })),
    endDate: t.Optional(t.String({ format: 'date' })),
    isActive: t.Optional(t.Boolean())
  }),

  academicYearQuery: t.Object({
    page: t.Optional(t.Number({ minimum: 1 })),
    limit: t.Optional(t.Number({ minimum: 1, maximum: 100 })),
    year: t.Optional(t.String({ maxLength: 10 })),
    isActive: t.Optional(t.Boolean()),
    startYear: t.Optional(t.Number({ minimum: 1900, maximum: 2100 })),
    endYear: t.Optional(t.Number({ minimum: 1900, maximum: 2100 })),
    search: t.Optional(t.String({ maxLength: 100 })),
    sortBy: t.Optional(t.Union([
      t.Literal('year'),
      t.Literal('startDate'),
      t.Literal('endDate'),
      t.Literal('isActive'),
      t.Literal('createdAt')
    ])),
    sortOrder: t.Optional(t.Union([
      t.Literal('asc'),
      t.Literal('desc')
    ]))
  })
};

export const semesterSchemas = {
  createSemester: t.Object({
    academicYearId: t.Numeric(),
    semesterNumber: t.Numeric({ minimum: 1, maximum: 3 }),
    name: t.String({ minLength: 1 }),
    startDate: t.String({ format: 'date-time' }),
    endDate: t.String({ format: 'date-time' }),
    registrationStart: t.String({ format: 'date-time' }),
    registrationEnd: t.String({ format: 'date-time' }),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),
  updateSemester: t.Object({
    academicYearId: t.Optional(t.Numeric()),
    semesterNumber: t.Optional(t.Numeric({ minimum: 1, maximum: 3 })),
    name: t.Optional(t.String({ minLength: 1 })),
    startDate: t.Optional(t.String({ format: 'date-time' })),
    endDate: t.Optional(t.String({ format: 'date-time' })),
    registrationStart: t.Optional(t.String({ format: 'date-time' })),
    registrationEnd: t.Optional(t.String({ format: 'date-time' })),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ]))
  }),
  semesterQuery: t.Object({
    page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
    limit: t.Optional(t.Numeric({ minimum: 1, default: 10 })),
    academicYearId: t.Optional(t.Numeric()),
    semesterNumber: t.Optional(t.Numeric()),
    status: t.Optional(t.Union([
      t.Literal('ACTIVE'),
      t.Literal('INACTIVE'),
      t.Literal('DRAFT')
    ])),
    search: t.Optional(t.String()),
    sortBy: t.Optional(t.Union([
        t.Literal('semesterNumber'),
        t.Literal('startDate'),
        t.Literal('name')
    ], { default: 'startDate' })),
    sortOrder: t.Optional(t.Union([t.Literal('asc'), t.Literal('desc')], { default: 'desc' }))
  })
};