import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
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

    const authResponse = await request(app.server).post('/sessions').send({
      phone: '123456789',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })

    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
