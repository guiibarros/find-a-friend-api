import { FastifyInstance } from 'fastify'

import { adoption } from '../controllers/pets/adoption'
import { profile } from '../controllers/pets/profile'
import { registerPet } from '../controllers/pets/register-pet'
import { search } from '../controllers/pets/search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', profile)
  app.get('/pets/search', search)
  app.patch('/pets/:petId/adoption', adoption)
  app.post('/pets', registerPet)
}
