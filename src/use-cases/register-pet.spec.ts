import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { RegisterPetUseCase } from './register-pet'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register pet use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Alfred',
      about: 'puppy alfred',
      age: 'PUPPY',
      size: 'SMALL',
      energy: 'HIGH',
      environment: 'LARGE',
      independency: 'HIGH',
      imagesUrl: ['image-01.jpg'],
      requirements: ['Large place for the animal.'],
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
