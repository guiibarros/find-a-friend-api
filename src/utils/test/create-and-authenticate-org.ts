import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
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

  const { token } = response.body

  return {
    token: token as string,
  }
}
