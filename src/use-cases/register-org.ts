import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

import { OrgsRepositories } from '@/repositories/orgs-repositories'

interface RegisterOrgRequest {
  title: string
  phone: string
  password: string
  cep: string
  address: string
  uf: string
  city: string
}

interface RegisterOrgResponse {
  org: Org
}

export class RegisterOrg {
  constructor(private readonly orgsRepository: OrgsRepositories) {}

  async execute({
    title,
    phone,
    password,
    cep,
    address,
    uf,
    city,
  }: RegisterOrgRequest): Promise<RegisterOrgResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByPhone(phone)

    if (orgAlreadyExists) {
      throw new Error('Org already exists.')
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      title,
      phone,
      password_hash,
      cep,
      address,
      uf,
      city,
    })

    return {
      org,
    }
  }
}
