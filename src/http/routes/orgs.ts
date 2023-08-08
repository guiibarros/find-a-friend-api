import { FastifyInstance } from 'fastify'

import { authenticate } from '../controllers/orgs/authenticate'
import { refresh } from '../controllers/orgs/refresh'
import { register } from '../controllers/orgs/register'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.patch('/token/refresh', refresh)
  app.post('/sessions', authenticate)
}
