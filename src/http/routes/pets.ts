import { FastifyInstance } from 'fastify'

import { profile } from '../controllers/pets/profile'
import { registerPet } from '../controllers/pets/register-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', profile)
  app.post('/pets', registerPet)
}
