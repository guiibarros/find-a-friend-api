import { resolve } from 'node:path'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Upload (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to upload pet images', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const petImageURL = resolve(process.cwd(), 'test', 'images', 'pet-01.png')

    const response = await request(app.server)
      .post('/pets/images/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('images', petImageURL)

    console.log(response.body)

    expect(response.statusCode).toEqual(200)
    expect(response.body.imagesUrl).toEqual([expect.stringContaining('http')])
  })
})
