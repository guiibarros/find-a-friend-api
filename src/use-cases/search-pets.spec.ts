import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { SearchPetsUseCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository

let sut: SearchPetsUseCase

describe('Search pets use case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)

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
      page: 1,
    })

    expect(pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: 'Alfred',
        adopted_at: null,
      }),
    ])
  })

  it('should be able to search paginated available pets in a location', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        id: `pet-id-${i}`,
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
    }

    const { pets } = await sut.execute({
      uf: 'PE',
      city: 'Recife',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ id: 'pet-id-21' }),
      expect.objectContaining({ id: 'pet-id-22' }),
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
      page: 1,
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
