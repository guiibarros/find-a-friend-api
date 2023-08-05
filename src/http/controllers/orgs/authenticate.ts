import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    phone: z.string(),
    password: z.string().min(6),
  })

  const { phone, password } = authenticateBodySchema.parse(request.body)

  try {
    const useCase = makeAuthenticateUseCase()

    const { org } = await useCase.execute({
      phone,
      password,
    })

    return reply.send({
      org,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({
        message: error.message,
      })
    }

    throw error
  }
}
