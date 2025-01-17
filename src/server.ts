import fastify from 'fastify'
const app = fastify()
app.get('/', async (request, reply) => {
  reply.header('Content-Type', 'application/json').code(200)
  return { hello: 'World' }
})
app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err)
  }
  console.log(`Server listening at ${address}`)
})
