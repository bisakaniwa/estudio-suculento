import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma), // Mudou aqui!
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        // 1. Verifica se o usuário preencheu os campos
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 2. Busca o usuário no banco Neon via Prisma
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        // 3. Se não achar usuário, ou se ele não tiver senha (ex: logou com Google antes)
        if (!user || !user.password) {
          return null;
        }

        // 4. Compara a senha digitada com a senha criptografada do banco
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        // 5. Se a senha estiver errada, recusa o login
        if (!isPasswordValid) {
          return null;
        }

        // 6. Se deu tudo certo, retorna o usuário para o Auth.js gerar a sessão!
        return user;
      }
    })
  ],
  session: {
    strategy: "jwt", // Continuamos forçando o JWT nos cookies
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
