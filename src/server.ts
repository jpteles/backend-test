import fastify from "fastify";
import { z } from 'zod';
import {PrismaClient} from '@prisma/client';



const app = fastify() 

const prisma = new PrismaClient({
    log: ['query'], 
})

app.post('/events', (request, reply) => {
    const createEventSchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maxinumAttendees: z.number().int().positive().nullable(),
    })

    const data = createEventSchema.parse(request.body)

    prisma.event.create({
        data: {
            title: data.title,
            details: data.details,
            maxinumAttendees: data.maxinumAttendees,
            slug: new Date().toISOString(),
        },
    })

    return { eventId: event.id }
})

app.listen({
    port:3333
}).then(() => {
    console.log('🚀 http server running on http:/localhost:3333')
})