import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findManyByCity(uf: string, city: string): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
