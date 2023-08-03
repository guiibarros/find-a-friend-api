import { Age, Pet, Rate, Size } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  name: string
  about: string
  age: Age
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
  constructor(private readonly petsRepository: PetsRepository) {}

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
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
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
    })

    return {
      pet,
    }
  }
}
