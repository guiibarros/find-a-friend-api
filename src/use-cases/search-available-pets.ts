import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

interface SearchAvailablePetsUseCaseRequest {
  uf: string
  city: string
}

interface SearchAvailablePetsUseCaseResponse {
  pets: Pet[]
}

export class SearchAvailablePetsUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    uf,
    city,
  }: SearchAvailablePetsUseCaseRequest): Promise<SearchAvailablePetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(uf, city)

    return {
      pets,
    }
  }
}
