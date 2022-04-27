import { Organisation } from '../types'

export const defaultOrganisation: Omit<Organisation, 'id'> = {
  name: '',
  isActive: false,
}
