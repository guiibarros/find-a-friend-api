import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

import { OrgsRepository } from '@/repositories/orgs-repository'

import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterUseCaseRequest {
  title: string
  phone: string
  password: string
  postal_code: string
  address: string
  uf: string
  city: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({
    title,
    phone,
    password,
    postal_code,
    address,
    uf,
    city,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByPhone(phone)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      title,
      phone,
      password_hash,
      postal_code,
      address,
      uf,
      city,
    })

    return {
      org,
    }
  }
}
