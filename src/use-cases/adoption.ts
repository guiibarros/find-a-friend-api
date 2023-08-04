import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface AdoptionUseCaseRequest {
  petId: string
}

interface AdoptionUseCaseResponse {
  pet: Pet
}

export class AdoptionUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: AdoptionUseCaseRequest): Promise<AdoptionUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    pet.adopted_at = pet.adopted_at ? null : new Date()

    await this.petsRepository.save(pet)

    return {
      pet,
    }
  }
}
