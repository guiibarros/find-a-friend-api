import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { SearchAvailablePetsUseCase } from './search-available-pets'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository

let sut: SearchAvailablePetsUseCase

describe('Search available pets use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchAvailablePetsUseCase(petsRepository)
  })

  it('should be able to fetch available pets in a city', async () => {
    const org = await orgsRepository.create({
      title: 'Cãopanheiros',
      phone: '999999999',
      password_hash: '123456',
      postal_code: '13254000',
      address: 'Rua do meio - 123, Boa viagem',
      uf: 'PE',
      city: 'Recife',
    })

    await petsRepository.create({
      name: 'Alfred',
      about: 'puppy alfred',
      age: 'PUPPY',
      size: 'SMALL',
      energy: 'HIGH',
      environment: 'LARGE',
      independency: 'HIGH',
      imagesUrl: ['image-01.jpg'],
      requirements: ['Large place for the animal.'],
      orgId: org.id,
    })

    await petsRepository.create({
      name: 'Garfield',
      about: 'puppy garfield',
      age: 'PUPPY',
      size: 'SMALL',
      energy: 'HIGH',
      environment: 'LARGE',
      independency: 'HIGH',
      imagesUrl: ['image-01.jpg'],
      requirements: ['Large place for the animal.'],
      orgId: org.id,
      adopted_at: new Date(),
    })

    const { pets } = await sut.execute({
      uf: 'PE',
      city: 'Recife',
    })

    expect(pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        orgId: org.id,
        adopted_at: null,
      }),
    ])
  })
})
