import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Register org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      title: 'Cãopanheiros',
      phone: '123456789',
      password: '123456',
      postal_code: '10000-000',
      address: 'Rua exemplo, 00',
      uf: 'SP',
      city: 'São Paulo',
    })

    expect(response.statusCode).toEqual(201)
  })
})
