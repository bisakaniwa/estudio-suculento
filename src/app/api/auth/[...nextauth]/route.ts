import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth" // Ajuste o caminho

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
