import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: any) => {
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      // send initial snapshot
      const contestants = await prisma.contestant.findMany({
        select: { id: true, firstName: true, lastName: true, votes: true }
      });
      const formatted = contestants.map(c => ({ 
        id: c.id, 
        name: `${c.firstName} ${c.lastName}`, 
        votes: c.votes.length 
      }));
      send({ type: 'initial', contestants: formatted });

      // poll every 2 seconds
      const interval = setInterval(async () => {
        const update = await prisma.contestant.findMany({
          select: { id: true, firstName: true, lastName: true, votes: true }
        });
        const formatted = update.map(c => ({ 
          id: c.id, 
          name: `${c.firstName} ${c.lastName}`, 
          votes: c.votes.length 
        }));
        send({ type: 'update', contestants: formatted });
      }, 2000);

      // clean up on stream close
      return () => clearInterval(interval);
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  });
}
