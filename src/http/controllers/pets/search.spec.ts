import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search available pets in a location', async () => {
    await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    await prisma.pet.create({
      data: {
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
      },
    })

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        uf: 'SP',
        city: 'São Paulo',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Alfred',
      }),
    ])
  })
})
