import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    // TODO: Connect to Prisma when ready
    // await prisma.subscriber.create({ data: { email } })

    return NextResponse.json({ success: true, data: { email } }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: { code: "VALIDATION_ERROR", message: error.issues } }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: { code: "SERVER_ERROR", message: "Algo salió mal" } }, { status: 500 });
  }
}
