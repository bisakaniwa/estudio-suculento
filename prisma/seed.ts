// prisma/seed.ts
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // 1. Defina a senha do seu admin e faça o hash dela
  const senhaPlana = "SuaSenhaSuperSegura123"; // Mude para a senha que desejar
  const hashPassword = await bcrypt.hash(senhaPlana, 10);

  // 2. Usamos o upsert para não dar erro caso você rode o script duas vezes
  const admin = await prisma.user.upsert({
    where: { email: "seuemail@dominio.com" }, // Mude para o seu email
    update: {}, // Se o usuário já existir, não faz nada
    create: {
      email: "seuemail@dominio.com", // Mude para o seu email
      name: "Admin",
      password: hashPassword,
    },
  })

  console.log("✅ Usuário admin criado com sucesso:", admin.email)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
