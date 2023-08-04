import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByPhone(phone: string) {
    const org = this.items.find((item) => item.phone === phone)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      title: data.title,
      phone: data.phone,
      password_hash: data.password_hash,
      postal_code: data.postal_code,
      address: data.address,
      uf: data.uf,
      city: data.city,
    }

    this.items.push(org)

    return org
  }
}
