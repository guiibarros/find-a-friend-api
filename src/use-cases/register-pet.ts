import { Age, Pet, Rate, Size } from '@prisma/client'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterPetUseCaseRequest {
  name: string
  about: string
  age: Age
  orgId: string
  size: Size
  energy: Rate
  independency: Rate
  environment: Size
  imagesUrl: string[]
  requirements: string[]
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private readonly petsRepository: PetsRepository,
    private readonly orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy,
    independency,
    environment,
    imagesUrl,
    requirements,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy,
      independency,
      environment,
      imagesUrl,
      requirements,
      orgId,
    })

    return {
      pet,
    }
  }
}
