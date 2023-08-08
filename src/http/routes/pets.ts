import { FastifyInstance } from 'fastify'

import { adoption } from '../controllers/pets/adoption'
import { profile } from '../controllers/pets/profile'
import { registerPet } from '../controllers/pets/register-pet'
import { search } from '../controllers/pets/search'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', profile)
  app.get('/pets/search', search)

  // Authenticated routes
  app.patch('/pets/:petId/adoption', { onRequest: [verifyJWT] }, adoption)
  app.post('/pets', { onRequest: [verifyJWT] }, registerPet)
}
