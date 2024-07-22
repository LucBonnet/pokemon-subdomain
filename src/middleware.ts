import { NextRequest, NextResponse } from 'next/server';
import PokeApi from './services/PokeApi';
import { AxiosError } from 'axios';

export default async function middleware(req: NextRequest) {

  const url = req.nextUrl;
  const hostname = req.headers.get("host");

  const subdomain = hostname?.split('.')[0];

  console.log(req.url)

  try {
    const pokemonResponse = await PokeApi.get("/pokemon/" + subdomain);
    const data = pokemonResponse.data;

    if (data) {
      const response = NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
      return response;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      return new Response(null, { status: err.response?.status });
    }

    return new Response(null, { status: 404 });
  }

  return new Response(null, { status: 404 });
}

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};