import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeAdoptionUseCase } from '@/use-cases/factories/make-adoption-use-case'

export async function adoption(request: FastifyRequest, reply: FastifyReply) {
  const adoptionParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = adoptionParamsSchema.parse(request.params)

  try {
    const useCase = makeAdoptionUseCase()

    await useCase.execute({
      petId,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }
  }
}
