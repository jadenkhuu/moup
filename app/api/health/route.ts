import { readFile } from 'fs/promises';

export async function GET() {
  try {
    const version = await readFile('/app/version.txt', 'utf8');

    return new Response(
      JSON.stringify({
        status: '200',
        statusText: 'OK',
        version: version.trim(),
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return new Response(
      JSON.stringify({
        status: '500',
        statusText: 'Internal Server Error',
        error: errorMessage,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
