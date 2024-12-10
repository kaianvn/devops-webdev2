import { RequestHandler, Router } from "express"
import { PrismaClient } from '@prisma/client'
import { z, ZodSchema } from "zod"

const prisma = new PrismaClient()
const entity = prisma.user
const router = Router()

const postInputDataFilter = z.object({
  name: z.string(),
  email: z.string({ message: "o campo email precisa sem do tipo string" })
})

const putInputDataFilter = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string({ message: "o campo email precisa sem do tipo string" }))
})

const middleZodTestSchema = (zodSchema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    const testResult = zodSchema.safeParse(req.body)
    if (!testResult.success) {
      res.status(422).json(testResult)
      return
    }
    next()
  }
}

router.get("/", async (req, res) => {
  const data = await entity.findMany()
  res.json(data)
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const data = await entity.findFirst({ where: { id } })
  res.json(data)
})

router.post("/", middleZodTestSchema(postInputDataFilter), async (req, res) => {
  const { name, email } = req.body
  const data = await entity.create({ data: { name, email } })
  res.json(data)
})

router.put("/:id", middleZodTestSchema(putInputDataFilter), async (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body
  const data = await entity.update({ data: { name, email }, where: { id } })
  res.json(data)
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const data = await entity.delete({ where: { id } })
  res.json(data)
})

export default router