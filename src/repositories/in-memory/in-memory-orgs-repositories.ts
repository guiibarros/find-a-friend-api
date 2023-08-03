import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { OrgsRepositories } from '../orgs-repositories'

export class InMemoryOrgsRepositories implements OrgsRepositories {
  public items: Org[] = []

  async findByPhone(phone: string) {
    const org = this.items.find((item) => item.phone === phone)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      title: data.title,
      phone: data.phone,
      password_hash: data.password_hash,
      cep: data.cep,
      address: data.address,
      uf: data.uf,
      city: data.city,
    }

    this.items.push(org)

    return org
  }
}
