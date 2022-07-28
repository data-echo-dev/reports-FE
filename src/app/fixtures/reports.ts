import { Report } from '../types'

export const defaultReport: Omit<Report,'id'> = {
  // this is the unassigned org ID
  organisation: 'XNcDtlEkoTFw3ybonFua',
  teacher: '',
  title: '',
  url: '',
  reportClass: '',
  subject: '',
}
