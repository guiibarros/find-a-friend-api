import { FastifyInstance } from 'fastify'

import { register } from '../controllers/orgs/register'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
}
