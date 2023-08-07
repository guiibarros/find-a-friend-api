import { Age, Rate, Size } from '@prisma/client'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

export async function search(request: FastifyRequest) {
  const searchQuerySchema = z.object({
    uf: z.string().min(2),
    city: z.string().nonempty(),
    age: z.nativeEnum(Age).optional(),
    size: z.nativeEnum(Size).optional(),
    energy: z.nativeEnum(Rate).optional(),
    independency: z.nativeEnum(Rate).optional(),
    environment: z.nativeEnum(Size).optional(),
    page: z.coerce.number().default(1),
  })

  const { uf, city, age, size, energy, independency, environment, page } =
    searchQuerySchema.parse(request.query)

  const useCase = makeSearchPetsUseCase()

  const { pets } = await useCase.execute({
    uf,
    city,
    age,
    energy,
    environment,
    independency,
    size,
    page,
  })

  return {
    pets,
  }
}
