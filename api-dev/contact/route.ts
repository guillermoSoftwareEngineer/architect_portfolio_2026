import { NextResponse } from "next/server";
import { z } from "zod";

// Validación de input con Zod (Exigencia del Agente 8)
const contactSchema = z.object({
  email: z.string().email("Correo inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // TODO: Rate limiting y envíos Resend en Fase 2
    
    return NextResponse.json(
      { 
        success: true, 
        data: { message: "Mensaje recibido temporalmente en Sandbox" } 
      }, 
      { status: 201 }
    );
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_FAILED", message: error.issues } },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Error catastrófico procesando contacto" } },
      { status: 500 }
    );
  }
}
