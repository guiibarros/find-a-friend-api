import { Age, Pet, Rate, Size } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

interface SearchAvailablePetsUseCaseRequest {
  uf: string
  city: string
  age?: Age
  size?: Size
  energy?: Rate
  independency?: Rate
  environment?: Size
}

interface SearchAvailablePetsUseCaseResponse {
  pets: Pet[]
}

export class SearchAvailablePetsUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    uf,
    city,
    ...query
  }: SearchAvailablePetsUseCaseRequest): Promise<SearchAvailablePetsUseCaseResponse> {
    const pets = await this.petsRepository.searchManyByLocation(
      { uf, city },
      query,
    )

    return {
      pets,
    }
  }
}
