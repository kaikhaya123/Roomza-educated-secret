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
        select: { id: true, name: true, votes: true }
      });
      send({ type: 'initial', contestants });

      // poll every 2 seconds
      const interval = setInterval(async () => {
        const update = await prisma.contestant.findMany({
          select: { id: true, name: true, votes: true }
        });
        send({ type: 'update', contestants: update });
      }, 2000);

      // clean up if client disconnects
      controller.closed.then(() => clearInterval(interval));
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
