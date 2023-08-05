import { FastifyInstance } from 'fastify'

import { authenticate } from '../controllers/orgs/authenticate'
import { register } from '../controllers/orgs/register'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
}
