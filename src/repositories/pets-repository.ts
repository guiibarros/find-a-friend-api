import { Age, Pet, Rate, Size, Prisma } from '@prisma/client'

export interface LocationParams {
  uf: string
  city: string
}

export interface QueryParams {
  age?: Age
  size?: Size
  energy?: Rate
  independency?: Rate
  environment?: Size
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  searchManyByLocation(
    location: LocationParams,
    query: QueryParams,
  ): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  save(pet: Pet): Promise<Pet>
}
