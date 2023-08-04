import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { RegisterPetUseCase } from './register-pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetUseCase

describe('Register pet use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)

    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register a pet', async () => {
    const org = await orgsRepository.create({
      title: 'Cãopanheiros',
      phone: '999999999',
      password_hash: '123456',
      postal_code: '13254000',
      address: 'Rua do meio - 123, Boa viagem',
      uf: 'PE',
      city: 'Recife',
    })

    const { pet } = await sut.execute({
      name: 'Alfred',
      about: 'puppy Alfred',
      age: 'PUPPY',
      size: 'SMALL',
      energy: 'HIGH',
      environment: 'LARGE',
      independency: 'HIGH',
      imagesUrl: ['image-01.jpg'],
      requirements: ['Large place for the animal.'],
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a pet with a non-existing org', async () => {
    await expect(() =>
      sut.execute({
        name: 'Alfred',
        about: 'puppy Alfred',
        age: 'PUPPY',
        size: 'SMALL',
        energy: 'HIGH',
        environment: 'LARGE',
        independency: 'HIGH',
        imagesUrl: ['image-01.jpg'],
        requirements: ['Large place for the animal.'],
        orgId: 'inexistent-org-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
