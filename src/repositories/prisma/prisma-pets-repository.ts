import { Pet, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { LocationParams, PetsRepository, QueryParams } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchManyByLocation(
    location: LocationParams,
    query: QueryParams,
    page: number,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          uf: location.uf,
          city: location.city,
        },
        ...query,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async save(data: Pet) {
    const pet = await prisma.pet.update({
      where: {
        id: data.id,
      },
      data,
    })

    return pet
  }
}
