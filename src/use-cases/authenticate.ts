import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'

import { OrgsRepository } from '@/repositories/orgs-repository'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  phone: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({
    phone,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByPhone(phone)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
