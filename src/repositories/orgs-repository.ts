import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByPhone(phone: string): Promise<Org | null>
}
