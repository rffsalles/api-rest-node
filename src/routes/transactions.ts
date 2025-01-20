import { FastifyInstance } from "fastify"
import {z} from 'zod'
import { knex } from "../database"
import { randomUUID } from "crypto"
import {checkSessionIdExists} from '../middlewares/check-session-id'

export async function transactionsRoutes(app:FastifyInstance){
    app.get('/:id',{
        preHandler: checkSessionIdExists
    }, async (request) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid()
        })
        const {sessionId} = request.cookies
        const {id} = getTransactionParamsSchema.parse(request.params)
        const transaction = await knex('transactions').where({
            id,
            session_id:sessionId
        }).first()
        return transaction
    })    
    app.get('/sumary',{
        preHandler: checkSessionIdExists
    }, async (request) => {
        const {sessionId} = request.cookies
        const sumary = await knex('transactions')
            .where({session_id:sessionId})
            .sum('amount as total')
            .first()
        return {sumary}
    })
    app.get('/',{
        preHandler: checkSessionIdExists
    }, async (request,reply) => {
        const {sessionId} = request.cookies
        const transactions = await knex('transactions')
        .where({session_id:sessionId})
        .select('*')
        return {transactions}
    })
    app.post('/', async (request,reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['income','outcome'])
        })

        const {title,amount,type} = createTransactionBodySchema.parse(request.body)

        let sessionId = request.cookies.sessionId 

        if (!sessionId){
            sessionId = randomUUID()
            reply.setCookie('sessionId',sessionId,{
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // Seven Days
            })
        }

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'income' ? amount : -amount,
            session_id:sessionId
        })

        return reply.code(201).send()

    })
}
