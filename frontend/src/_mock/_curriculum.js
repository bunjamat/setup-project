import { _mock } from './_mock';

// ----------------------------------------------------------------------

// Mock faculties (คณะ)
export const _faculties = [
  {
    id: '1',
    name: 'คณะวิศวกรรมศาสตร์',
    nameEn: 'Faculty of Engineering',
    code: 'ENG',
    description: 'คณะวิศวกรรมศาสตร์ มหาวิทยาลัยราชมงคล',
    establishedYear: 1975,
    status: 'active',
    dean: 'ศ.ดร.สมชาย วิศวกรรม',
    totalMajors: 8,
    totalStudents: 2500,
  },
  {
    id: '2',
    name: 'คณะครุศาสตร์อุตสาหกรรม',
    nameEn: 'Faculty of Industrial Education',
    code: 'IE',
    description: 'คณะครุศาสตร์อุตสาหกรรม มหาวิทยาลัยราชมงคล',
    establishedYear: 1980,
    status: 'active',
    dean: 'ผศ.ดร.สมศรี การศึกษา',
    totalMajors: 6,
    totalStudents: 1800,
  },
  {
    id: '3',
    name: 'คณะเทคโนโลยีสารสนเทศ',
    nameEn: 'Faculty of Information Technology',
    code: 'IT',
    description: 'คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชมงคล',
    establishedYear: 1995,
    status: 'active',
    dean: 'ผศ.ดร.วิชัย คอมพิวเตอร์',
    totalMajors: 5,
    totalStudents: 2200,
  },
  {
    id: '4',
    name: 'คณะบริหารธุรกิจ',
    nameEn: 'Faculty of Business Administration',
    code: 'BA',
    description: 'คณะบริหารธุรกิจ มหาวิทยาลัยราชมงคล',
    establishedYear: 1985,
    status: 'active',
    dean: 'ผศ.ดร.สุรชัย ธุรกิจ',
    totalMajors: 4,
    totalStudents: 1900,
  },
  {
    id: '5',
    name: 'คณะศิลปศาสตร์และวิทยาศาสตร์',
    nameEn: 'Faculty of Liberal Arts and Science',
    code: 'LAS',
    description: 'คณะศิลปศาสตร์และวิทยาศาสตร์ มหาวิทยาลัยราชมงคล',
    establishedYear: 1978,
    status: 'active',
    dean: 'ผศ.ดร.อรุณี วิทยาศาสตร์',
    totalMajors: 7,
    totalStudents: 1600,
  },
];

// Mock majors/branches (สาขา)
export const _majors = [
  // Engineering majors
  {
    id: '1',
    facultyId: '1',
    name: 'วิศวกรรมคอมพิวเตอร์',
    nameEn: 'Computer Engineering',
    code: 'CPE',
    description: 'สาขาวิชาวิศวกรรมคอมพิวเตอร์',
    degreeLevel: 'bachelor',
    totalCredits: 140,
    duration: 4,
    status: 'active',
    headOfMajor: 'ผศ.ดร.นิรันดร์ คอมพิวเตอร์',
    totalStudents: 320,
  },
  {
    id: '2',
    facultyId: '1',
    name: 'วิศวกรรมไฟฟ้า',
    nameEn: 'Electrical Engineering',
    code: 'EE',
    description: 'สาขาวิชาวิศวกรรมไฟฟ้า',
    degreeLevel: 'bachelor',
    totalCredits: 140,
    duration: 4,
    status: 'active',
    headOfMajor: 'ผศ.ดร.สุรชัย ไฟฟ้า',
    totalStudents: 280,
  },
  {
    id: '3',
    facultyId: '1',
    name: 'วิศวกรรมเครื่องกล',
    nameEn: 'Mechanical Engineering',
    code: 'ME',
    description: 'สาขาวิชาวิศวกรรมเครื่องกล',
    degreeLevel: 'bachelor',
    totalCredits: 140,
    duration: 4,
    status: 'active',
    headOfMajor: 'ผศ.ดร.ประชา เครื่องกล',
    totalStudents: 300,
  },
  // IT majors
  {
    id: '4',
    facultyId: '3',
    name: 'เทคโนโลยีสารสนเทศ',
    nameEn: 'Information Technology',
    code: 'IT',
    description: 'สาขาวิชาเทคโนโลยีสารสนเทศ',
    degreeLevel: 'bachelor',
    totalCredits: 130,
    duration: 4,
    status: 'active',
    headOfMajor: 'ผศ.ดร.สมหมาย ไอที',
    totalStudents: 450,
  },
  {
    id: '5',
    facultyId: '3',
    name: 'วิทยาการคอมพิวเตอร์',
    nameEn: 'Computer Science',
    code: 'CS',
    description: 'สาขาวิชาวิทยาการคอมพิวเตอร์',
    degreeLevel: 'bachelor',
    totalCredits: 132,
    duration: 4,
    status: 'active',
    headOfMajor: 'ผศ.ดร.วิทยา คอมพิวเตอร์',
    totalStudents: 380,
  },
  // Business majors
  {
    id: '6',
    facultyId: '4',
    name: 'การจัดการ',
    nameEn: 'Management',
    code: 'MGT',
    description: 'สาขาวิชาการจัดการ',
    degreeLevel: 'bachelor',
    totalCredits: 126,
    duration: 4,
    status: 'active',
    headOfMajor: 'ผศ.ดร.สุภาพ บริหาร',
    totalStudents: 350,
  },
  {
    id: '7',
    facultyId: '4',
    name: 'การบัญชี',
    nameEn: 'Accounting',
    code: 'ACC',
    description: 'สาขาวิชาการบัญชี',
    degreeLevel: 'bachelor',
    totalCredits: 128,
    duration: 4,
    status: 'active',
    headOfMajor: 'ผศ.ดร.สมคิด บัญชี',
    totalStudents: 290,
  },
];

// Mock curriculums (หลักสูตร)
export const _curriculums = Array.from({ length: 24 }, (_, index) => {
  const majorIndex = index % _majors.length;
  const major = _majors[majorIndex];
  const faculty = _faculties.find(f => f.id === major.facultyId);
  
  const academicYears = ['2564', '2565', '2566', '2567'];
  const academicYear = academicYears[index % academicYears.length];
  
  const versions = ['A', 'B', 'C'];
  const version = versions[index % versions.length];
  
  const statusOptions = ['active', 'inactive', 'archived', 'draft'];
  const status = statusOptions[index % statusOptions.length];

  return {
    id: _mock.id(index),
    code: `${major.code}${academicYear}${version}`,
    name: `หลักสูตร${major.name} (${academicYear})`,
    nameEn: `${major.nameEn} Curriculum (${academicYear})`,
    academicYear: academicYear,
    version: version,
    
    // Relations
    majorId: major.id,
    major: {
      id: major.id,
      name: major.name,
      nameEn: major.nameEn,
      code: major.code,
    },
    facultyId: faculty.id,
    faculty: {
      id: faculty.id,
      name: faculty.name,
      nameEn: faculty.nameEn,
      code: faculty.code,
    },
    
    // Curriculum details
    degreeLevel: major.degreeLevel,
    totalCredits: major.totalCredits + (index % 10), // slight variation
    duration: major.duration,
    
    // Academic structure
    coreCredits: 60 + (index % 15),
    majorCredits: 45 + (index % 20),
    electiveCredits: 15 + (index % 10),
    freeElectiveCredits: 6 + (index % 5),
    
    // Status and metadata
    status: status,
    isActive: status === 'active',
    isDefault: index % 7 === 0, // some curricula are default
    
    // Approval information
    approvedBy: 'สภามหาวิทยาลัย',
    approvedDate: _mock.time(index),
    effectiveDate: _mock.time(index),
    
    // Educational objectives
    objectives: [
      'เพื่อผลิตบัณฑิตที่มีความรู้และทักษะในสาขาวิชา',
      'เพื่อสร้างบัณฑิตที่มีคุณธรรมและจริยธรรม',
      'เพื่อพัฒนาบัณฑิตให้มีทักษะการคิดวิเคราะห์',
    ],
    
    // Learning outcomes
    learningOutcomes: [
      'สามารถประยุกต์ความรู้ในการแก้ปัญหา',
      'มีทักษะการสื่อสารที่ดี',
      'สามารถทำงานเป็นทีมได้',
    ],
    
    // Career prospects
    careerProspects: [
      'นักพัฒนาระบบ',
      'วิศวกรซอฟต์แวร์',
      'นักวิเคราะห์ระบบ',
    ],
    
    // Administrative data
    totalSubjects: 45 + (index % 20),
    totalStudents: major.totalStudents / 4 + (index % 50), // rough estimate
    enrollmentCount: index * 12 + (index % 25),
    graduateCount: index * 8 + (index % 15),
    
    // Timestamps
    createdAt: _mock.time(index),
    updatedAt: _mock.time(index),
    
    // Additional metadata
    revision: (index % 3) + 1,
    language: 'th',
    coordinator: _mock.fullName(index),
    description: `หลักสูตร${major.name} ปีการศึกษา ${academicYear} ${_mock.description(index)}`,
  };
});

// Curriculum status options
export const CURRICULUM_STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'archived', label: 'Archived' },
  { value: 'draft', label: 'Draft' },
];

// Degree level options
export const DEGREE_LEVEL_OPTIONS = [
  { value: 'all', label: 'All Levels' },
  { value: 'bachelor', label: 'Bachelor' },
  { value: 'master', label: 'Master' },
  { value: 'doctoral', label: 'Doctoral' },
];