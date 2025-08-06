
import type { ClientDetails } from './ClientDetails'
import type { ProgressRecord } from './ProgressRecord'
export type Client = {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  details?: ClientDetails | null
  progressRecord?: ProgressRecord[]
}