import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import type { NextRequest, NextFetchEvent } from "next/server";

// 1. Instanciamos o middleware do NextAuth
const authMiddleware = withAuth({});

// 2. Exportamos a função proxy recebendo os tipos exatos do Next.js
export default function proxy(req: NextRequest, event: NextFetchEvent) {
  // 3. Fazemos um cast seguro apenas na requisição, 
  // afirmando que ela atende aos requisitos do NextAuth.
  return authMiddleware(req as NextRequestWithAuth, event);
}

// 4. O matcher
export const config = {
  matcher: ["/admin/:path*"],
};
