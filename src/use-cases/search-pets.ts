import { Age, Pet, Rate, Size } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsUseCaseRequest {
  uf: string
  city: string
  age?: Age
  size?: Size
  energy?: Rate
  independency?: Rate
  environment?: Size
  page: number
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    uf,
    city,
    page,
    ...query
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchManyByLocation(
      { uf, city },
      query,
      page,
    )

    return {
      pets,
    }
  }
}
