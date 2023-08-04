import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { PetsRepository } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private readonly orgsRepository: InMemoryOrgsRepository) {}

  async findManyByCity(uf: string, city: string) {
    const orgs = this.orgsRepository.items.filter(
      (org) => org.uf === uf && org.city === city,
    )

    const pets = this.items.filter((pet) => {
      return orgs.some((org) => org.id === pet.orgId) && !pet.adopted_at
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
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
      orgId: data.orgId,
    }

    this.items.push(pet)

    return pet
  }
}
