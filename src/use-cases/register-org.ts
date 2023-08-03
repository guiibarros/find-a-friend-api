import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

import { OrgsRepository } from '@/repositories/orgs-repository'

interface RegisterOrgUseCaseRequest {
  title: string
  phone: string
  password: string
  cep: string
  address: string
  uf: string
  city: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({
    title,
    phone,
    password,
    cep,
    address,
    uf,
    city,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
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
