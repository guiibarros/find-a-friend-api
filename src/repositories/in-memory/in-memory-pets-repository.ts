import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy: data.energy,
      environment: data.environment,
      independency: data.independency,
      imagesUrl: Array.isArray(data.imagesUrl) ? data.imagesUrl : [],
      requirements: Array.isArray(data.requirements) ? data.requirements : [],
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
    }

    this.items.push(pet)

    return pet
  }
}
