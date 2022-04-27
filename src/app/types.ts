export interface Organisation {
  id: string
  name: string
  isActive: boolean
}

export interface User {
  email: string
  name: string
  organisationId: string
  uid: string
  isSuperAdmin?: boolean
}

export interface Report {
  organisationId: string
  teacherId: string
  title: string
  url: string
}
