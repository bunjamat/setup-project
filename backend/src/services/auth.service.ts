import { prisma } from '../../prisma/client'
import bcrypt from 'bcryptjs'
import type { CreateUserRequest, LoginRequest } from '../types'
import { UserType } from '@prisma/client'

export interface AuthUser {
  id: number
  email: string
  username: string | null
  firstName: string | null
  lastName: string | null
  name: string | null
  roleId: number
  status: string
  createdAt: Date
  updatedAt: Date
  role: {
    id: number
    name: string
    description: string | null
  }
}

export const authService = {
  // ตรวจสอบว่าอีเมลมีอยู่แล้วหรือไม่
  async checkUserExists(email: string, username?: string) {
    const whereCondition: any = { email }
    
    if (username) {

        const query = await db.query("SELECT * FROM users WHERE email = $1", [email]);

      whereCondition.OR = [
        { email },
        { username }
      ]
      delete whereCondition.email
    }

    

    const existingUser = await prisma.user.findFirst({
      where: whereCondition
    })
    
    return existingUser
  },

  // สร้างผู้ใช้ใหม่
  async createUser(userData: CreateUserRequest): Promise<AuthUser> {
    const { password, role: roleName, ...restUserData } = userData
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // หา role ID จากชื่อ role
    const role = await prisma.role.findUnique({
      where: { name: roleName }
    })
    
    if (!role) {
      throw new Error('Invalid role specified')
    }
    
    // สร้างผู้ใช้ใหม่
    const newUser = await prisma.user.create({
      data: {
        ...restUserData,
        password: hashedPassword,
        roleId: role.id,
        name: `${userData.firstName} ${userData.lastName}`,
        status: 'ACTIVE',
        userType: role.name as UserType
      },
      include: {
        role: true
      }
    })
    
    // สร้าง student profile หากเป็น role student
    if (role.name === 'student') {
      await this.createStudentProfile(newUser.id)
    }
    
    // สร้าง instructor profile หากเป็น role instructor
    if (role.name === 'instructor') {
      await this.createInstructorProfile(newUser.id, userData)
    }
    
    // สร้าง admin profile หากเป็น role admin หรือ super_admin
    if (role.name === 'admin' || role.name === 'super_admin') {
      await this.createAdminProfile(newUser.id, role.name)
    }
    
    return newUser
  },

  // สร้าง student profile
  async createStudentProfile(userId: number) {
    // หา department และ program เริ่มต้น (คณะวิศวกรรมศาสตร์)
    const department = await prisma.department.findFirst({
      where: { name: 'คณะวิศวกรรมศาสตร์' }
    })
    
    const program = await prisma.program.findFirst({
      where: { code: 'CS2024' }
    })
    
    const studentCount = await prisma.student.count()
    const studentCode = `650${String(100001 + studentCount).padStart(6, '0')}`
    
    await prisma.student.create({
      data: {
        userId,
        studentCode,
        departmentId: department?.id || 1,
        programId: program?.id || 1,
        yearOfStudy: 1,
        semester: 1,
        gpa: 0.00,
        totalCredits: 0
      }
    })
  },

  // สร้าง instructor profile
  async createInstructorProfile(userId: number, userData: CreateUserRequest) {
    const department = await prisma.department.findFirst({
      where: { name: 'คณะวิศวกรรมศาสตร์' }
    })
    
    const ranking = await prisma.ranking.findFirst({
      where: { name: 'อาจารย์' }
    })
    
    await prisma.instructor.create({
      data: {
        userId,
        name: `${userData.firstName} ${userData.lastName}`,
        position: 'อาจารย์',
        departmentId: department?.id || 1,
        rankingId: ranking?.id || 1,
        status: 'ACTIVE',
        description: `${userData.firstName} ${userData.lastName} ประจำคณะวิศวกรรมศาสตร์`
      }
    })
  },

  // สร้าง admin profile
  async createAdminProfile(userId: number, roleName: string) {
    const department = await prisma.department.findFirst({
      where: { name: 'คณะวิศวกรรมศาสตร์' }
    })
    
    await prisma.admin.create({
      data: {
        userId,
        position: roleName === 'super_admin' ? 'ผู้ดูแลระบบสูงสุด' : 'ผู้ดูแลระบบ',
        departmentId: department?.id || 1
      }
    })
  },

  // ตรวจสอบการเข้าสู่ระบบ
  async authenticate(credentials: LoginRequest): Promise<AuthUser | null> {
 
    console.log("🚀 ~ authenticate ~ credentials:", await bcrypt.hash(credentials.password, 12))
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
      include: {
        role: true
      }
    })
    
    if (!user) {
      return null
    }
    
    // ตรวจสอบว่าบัญชีถูก activate หรือไม่
    if (user.status !== 'ACTIVE') {
      throw new Error('Account is not active')
    }
    
    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
    console.log("🚀 ~ authenticate ~ isPasswordValid:", isPasswordValid)
    if (!isPasswordValid) {
      
      return null
    }
    
    return user
  },

  // ดึงข้อมูลผู้ใช้ตาม ID
  async getUserById(id: number): Promise<AuthUser | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: true
      }
    })
    
    return user
  },

  // ดึงข้อมูลผู้ใช้ตาม email
  async getUserByEmail(email: string): Promise<AuthUser | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true
      }
    })
    
    return user
  },

  // อัพเดทข้อมูลผู้ใช้
  async updateUser(id: number, updateData: any): Promise<AuthUser> {
    // ลบ fields ที่ไม่ควรมีใน update
    const { role, ...safeUpdateData } = updateData
    
    const user = await prisma.user.update({
      where: { id },
      data: safeUpdateData,
      include: {
        role: true
      }
    })
    
    return user
  },

  // ตรวจสอบรหัสผ่าน
  async verifyPassword(userId: number, password: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) {
      return false
    }
    
    return await bcrypt.compare(password, user.password)
  },

  // Hash รหัสผ่าน
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12)
  },

  // เปลี่ยนรหัสผ่าน
  async changePassword(id: number, newPassword: string): Promise<AuthUser> {
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    
    const user = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
      include: {
        role: true
      }
    })
    
    return user
  },

  // ปิดการใช้งานบัญชี
  async deactivateUser(id: number): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { status: 'INACTIVE' }
    })
  }
} 