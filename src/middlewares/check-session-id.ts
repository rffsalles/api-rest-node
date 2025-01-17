import { FastifyReply, FastifyRequest } from "fastify"
import cookie from '@fastify/cookie'
export async function checkSessionIdExists(request:FastifyRequest,reply:FastifyReply){
    const sessionId = request.cookies.sessionId
    if (!sessionId){
        return reply.status(401).send({
            message: 'Unauthorized'
        })
    }    
}