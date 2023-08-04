import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { SearchAvailablePetsUseCase } from './search-available-pets'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository

let sut: SearchAvailablePetsUseCase

describe('Search available pets use case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchAvailablePetsUseCase(petsRepository)

    await orgsRepository.create({
      id: 'org-01',
      title: 'Cãopanheiros',
      phone: '999999999',
      password_hash: '123456',
      postal_code: '13254000',
      address: 'Rua do meio - 123, Boa viagem',
      uf: 'PE',
      city: 'Recife',
    })
  })

  it('should be able to search available pets in a location', async () => {
    await petsRepository.create({
      name: 'Alfred',
      about: 'puppy Alfred',
      age: 'PUPPY',
      size: 'SMALL',
      energy: 'HIGH',
      environment: 'LARGE',
      independency: 'HIGH',
      imagesUrl: ['image-01.jpg'],
      requirements: ['Large place for the animal.'],
      orgId: 'org-01',
    })

    await petsRepository.create({
      name: 'Garfield',
      about: 'puppy Garfield',
      age: 'PUPPY',
      size: 'SMALL',
      energy: 'HIGH',
      environment: 'LARGE',
      independency: 'HIGH',
      imagesUrl: ['image-01.jpg'],
      requirements: ['Large place for the animal.'],
      orgId: 'org-01',
      adopted_at: new Date(),
    })

    const { pets } = await sut.execute({
      uf: 'PE',
      city: 'Recife',
    })

    expect(pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: 'Alfred',
        adopted_at: null,
      }),
    ])
  })

  it('should be able to filter pets by user query', async () => {
    await petsRepository.create({
      name: 'Alfred',
      about: 'puppy Alfred',
      age: 'PUPPY',
      size: 'SMALL',
      energy: 'HIGH',
      environment: 'LARGE',
      independency: 'LOW',
      imagesUrl: ['image-01.jpg'],
      requirements: ['Large place for the animal.'],
      orgId: 'org-01',
    })

    await petsRepository.create({
      name: 'Garfield',
      about: 'adolescent Garfield',
      age: 'ADOLESCENT',
      size: 'MEDIUM',
      energy: 'LOW',
      environment: 'LARGE',
      independency: 'HIGH',
      imagesUrl: ['image-01.jpg'],
      requirements: ['Large place for the animal.'],
      orgId: 'org-01',
      adopted_at: null,
    })

    const { pets } = await sut.execute({
      uf: 'PE',
      city: 'Recife',
      environment: 'LARGE',
      age: 'ADOLESCENT',
    })

    expect(pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: 'Garfield',
        adopted_at: null,
      }),
    ])
  })
})
