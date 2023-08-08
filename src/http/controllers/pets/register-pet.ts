import { Age, Rate, Size } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string().nonempty(),
    about: z.string().nonempty(),
    age: z.nativeEnum(Age),
    size: z.nativeEnum(Size),
    energy: z.nativeEnum(Rate),
    independency: z.nativeEnum(Rate),
    environment: z.nativeEnum(Size),
    imagesUrl: z.array(z.string()),
    requirements: z.array(z.string()),
  })

  const {
    name,
    about,
    age,
    size,
    energy,
    independency,
    environment,
    imagesUrl,
    requirements,
  } = registerPetBodySchema.parse(request.body)

  try {
    const useCase = makeRegisterPetUseCase()

    await useCase.execute({
      name,
      about,
      age,
      size,
      energy,
      independency,
      environment,
      imagesUrl,
      requirements,
      orgId: request.user.sub,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
