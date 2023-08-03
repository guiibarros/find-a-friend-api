import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      title: 'Cãopanheiros',
      phone: '999999999',
      password_hash: await hash('123456', 6),
      cep: '13254000',
      address: 'Rua do meio - 123, Boa viagem',
      uf: 'PE',
      city: 'Recife',
    })

    const { org } = await sut.execute({
      phone: '999999999',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong phone', async () => {
    await expect(() =>
      sut.execute({
        phone: '999999999',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      title: 'Cãopanheiros',
      phone: '999999999',
      password_hash: await hash('123456', 6),
      cep: '13254000',
      address: 'Rua do meio - 123, Boa viagem',
      uf: 'PE',
      city: 'Recife',
    })

    await expect(() =>
      sut.execute({
        phone: '999999999',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
