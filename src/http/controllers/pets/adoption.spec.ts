import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Adoption (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to adopt a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    let pet = await prisma.pet.create({
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
      .patch(`/pets/${pet.id}/adoption`)
      .set('Authorization', `bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    pet = await prisma.pet.findFirstOrThrow()

    expect(pet.adopted_at).toEqual(expect.any(Date))
  })
})
