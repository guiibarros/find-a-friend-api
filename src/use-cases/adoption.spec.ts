import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { AdoptionUseCase } from './adoption'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository

let sut: AdoptionUseCase

describe('Adoption use case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)

    sut = new AdoptionUseCase(petsRepository)

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

  it('should be able to adopt a pet', async () => {
    await petsRepository.create({
      id: 'pet-01',
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

    const { pet } = await sut.execute({
      petId: 'pet-01',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.adopted_at).toEqual(expect.any(Date))
  })

  it('should be able to return a pet for adoption', async () => {
    await petsRepository.create({
      id: 'pet-01',
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
      adopted_at: new Date(),
    })

    const { pet } = await sut.execute({
      petId: 'pet-01',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.adopted_at).toEqual(null)
  })

  it('should not be able to adopt an inexistent pet', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-pet-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
