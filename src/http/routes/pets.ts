import { FastifyInstance } from 'fastify'

import { registerPet } from '../controllers/pets/register-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', registerPet)
}
