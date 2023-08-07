import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetProfileUseCase } from '@/use-cases/factories/make-get-pet-profile-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = profileParamsSchema.parse(request.params)

  try {
    const useCase = makeGetPetProfileUseCase()

    const { pet } = await useCase.execute({
      petId,
    })

    return {
      pet,
    }
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
