import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await prisma.org.create({
      data: {
        title: 'Cãopanheiros',
        phone: '123456789',
        password_hash: await hash('123456', 6),
        postal_code: '10000-000',
        address: 'Rua exemplo, 00',
        uf: 'SP',
        city: 'São Paulo',
      },
    })

    const response = await request(app.server).post('/sessions').send({
      phone: '123456789',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
