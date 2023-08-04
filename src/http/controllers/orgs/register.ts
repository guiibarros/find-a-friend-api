import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    phone: z.string(),
    password: z.string().min(6),
    postal_code: z.string(),
    address: z.string(),
    uf: z.string().min(2),
    city: z.string(),
  })

  const { title, phone, password, postal_code, address, uf, city } =
    registerBodySchema.parse(request.body)

  try {
    const useCase = makeRegisterUseCase()

    await useCase.execute({
      title,
      phone,
      password,
      postal_code,
      address,
      uf,
      city,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
