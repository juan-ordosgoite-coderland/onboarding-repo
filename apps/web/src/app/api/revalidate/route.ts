import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tag = searchParams.get('tag');

  if (!tag) {
    return NextResponse.json(
      { message: 'Falta el parámetro "tag". Ejemplo: ?tag=tasks-cache' },
      { status: 400 },
    );
  }

  // Pasamos el segundo argumento exigido por TypeScript en Next 16
  revalidateTag(tag, 'default');

  return NextResponse.json({
    revalidatedByTag: true,
    tag,
    now: new Date().toLocaleTimeString('es-ES'),
  });
}
