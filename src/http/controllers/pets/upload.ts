import { FastifyReply, FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { extname, resolve } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export async function upload(request: FastifyRequest, reply: FastifyReply) {
  const images = request.files()

  const imagesUrl = []

  for await (const image of images) {
    const fileId = randomUUID()
    const extension = extname(image.filename)

    const filename = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(process.cwd(), 'uploads', filename),
    )

    await pump(image.file, writeStream)

    const fullURL = request.protocol.concat('://').concat(request.hostname)
    const imageUrl = new URL(`/uploads/${filename}`, fullURL).toString()

    imagesUrl.push(imageUrl)
  }

  return {
    imagesUrl,
  }
}
