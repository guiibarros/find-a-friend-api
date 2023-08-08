import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Register pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'Alfred',
        about: 'puppy Alfred',
        age: 'PUPPY',
        size: 'SMALL',
        energy: 'HIGH',
        environment: 'LARGE',
        independency: 'HIGH',
        imagesUrl: ['image-01.jpg'],
        requirements: ['Large place for the animal.'],
      })

    expect(response.statusCode).toEqual(201)
  })
})
