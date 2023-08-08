import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'
import { orgsRoutes } from './http/routes/orgs'
import { petsRoutes } from './http/routes/pets'

export const app = fastify()

app.register(fastifyMultipart)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      errors: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO - log to an external tool
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
