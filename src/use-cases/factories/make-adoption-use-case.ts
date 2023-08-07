import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { AdoptionUseCase } from '../adoption'

export function makeAdoptionUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new AdoptionUseCase(petsRepository)

  return useCase
}
