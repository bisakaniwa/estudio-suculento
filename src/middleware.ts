import type { NextRequest } from "next/server"
import type { Session } from "next-auth"
import { auth } from "../auth"

const publicRoutes = ["/", "/sobre", "/precos"]; // Todos podem acessar
const authRoutes = ["/login", "/cadastro"];      // Apenas quem NÃO está logado acessa (ex: tela de login)
const apiAuthPrefix = "/api/auth";               // Rotas internas do Auth.js (precisam estar sempre liberadas)
const DEFAULT_LOGGED_IN_REDIRECT = "/dashboard"; // Pra onde mandar o usuário logado

export default auth((req: NextRequest & { auth: Session | null }) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return; // Retornar `undefined` ou nada faz o middleware deixar a requisição passar
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // Se já está logado e tentou ir pro /login, manda pro dashboard
      return Response.redirect(new URL(DEFAULT_LOGGED_IN_REDIRECT, nextUrl));
    }
    return; // Se não está logado, deixa ver a página de login
  }

  if (!isLoggedIn && !isPublicRoute) {
    // Se não está logado e a rota não está na lista das públicas, bloqueia!

    // (Opcional) Salva a URL que o usuário tentou acessar para redirecionar depois do login
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  return;
})

// Define em quais rotas o middleware vai rodar (ignora arquivos estáticos)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
