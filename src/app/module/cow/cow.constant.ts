export const locations = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
]
export enum Location {
  Dhaka = 'Dhaka',
  Chattogram = 'Chattogram',
  Barishal = 'Barishal',
  Rajshahi = 'Rajshahi',
  Sylhet = 'Sylhet',
  Comilla = 'Comilla',
  Rangpur = 'Rangpur',
  Mymensingh = 'Mymensingh',
}

export type bread =
  | 'Brahman'
  | 'Nellore'
  | '  Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | ' Kankrej'

export const studentFilterableFields = [
  'searchTerm',
  'minPrice',
  'maxPrice',
  'location',
]
export const items = ['page', 'limit', 'sortBy', 'sortOrder']

export const filterableField = [
  'searchTerm',
  'maxPrice',
  'minPrice',
  'location',
]
