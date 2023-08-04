import { $Enums, Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { PetsRepository, LocationParams, QueryParams } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private readonly orgsRepository: InMemoryOrgsRepository) {}

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchManyByLocation(location: LocationParams, query: QueryParams) {
    const orgs = this.orgsRepository.items.filter(
      (org) => org.uf === location.uf && org.city === location.city,
    )

    const pets = this.items.filter((pet) => {
      return orgs.some((org) => org.id === pet.orgId) && !pet.adopted_at
    })

    const filteredPets = pets.filter((pet) => {
      return Object.entries(query).every((item) => {
        const [key, value] = item as [keyof QueryParams, string]

        return pet[key] === value
      })
    })

    return filteredPets.length > 0 ? filteredPets : pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
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
