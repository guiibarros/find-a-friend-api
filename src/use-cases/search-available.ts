import { Age, Pet, Rate, Size } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

interface SearchAvailableUseCaseRequest {
  uf: string
  city: string
  age?: Age
  size?: Size
  energy?: Rate
  independency?: Rate
  environment?: Size
}

interface SearchAvailableUseCaseResponse {
  pets: Pet[]
}

export class SearchAvailableUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    uf,
    city,
    ...query
  }: SearchAvailableUseCaseRequest): Promise<SearchAvailableUseCaseResponse> {
    const pets = await this.petsRepository.searchManyByLocation(
      { uf, city },
      query,
    )

    return {
      pets,
    }
  }
}
