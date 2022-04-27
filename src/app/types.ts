export interface Organisation {
  id: string
  name: string
  isActive: boolean
}

export interface User {
  email: string
  name: string
  organisation: string
  uid: string
  isSuperAdmin?: boolean
  isEditor?: boolean
}

export interface Report {
  organisation: string
  teacher: string
  title: string
  url: string
}
