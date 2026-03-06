"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // <-- Importação da v4 (Roda no cliente)
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Alert
} from "@mantine/core";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Substituímos o useTransition por um state simples

  // Usamos o evento padrão do React para formulários
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o recarregamento da página
    setIsLoading(true);
    setError(null);

    // Pegamos os dados do formulário nativamente
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Disparamos o signIn da v4
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // IMPORTANTE: Deixamos false para podermos tratar o erro na tela sem recarregar!
    });

    if (result?.error) {
      // Se deu erro (senha errada, etc), mostramos no Mantine
      setError("Email ou senha incorretos.");
      setIsLoading(false);
    } else if (result?.ok) {
      // Se deu sucesso, redirecionamos via roteador do Next.js
      router.push("/admin/home"); // Mude para a rota que desejar
      router.refresh(); // Força o Next.js a re-renderizar os Server Components com a nova sessão
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-500">
      <Container size={420} w="100%">
        <Title ta="center" className="text-3xl font-extrabold text-gray-900 mb-6">
          Acesso Restrito
        </Title>

        <Paper withBorder shadow="md" p={30} radius="md" className="bg-white">
          {/* Trocamos o action pelo onSubmit tradicional */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {error && (
              <Alert title="Erro de Autenticação" color="red" variant="light">
                {error}
              </Alert>
            )}

            <TextInput
              label="Email"
              placeholder="admin@seudominio.com"
              name="email"
              type="email"
              required
              disabled={isLoading}
            />

            <PasswordInput
              label="Senha"
              placeholder="Sua senha"
              name="password"
              required
              disabled={isLoading}
            />

            <Button
              type="submit"
              fullWidth
              mt="xl"
              loading={isLoading}
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Entrar
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
