import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@mantine/core/styles.css';
import "./globals.css";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { createTheme } from "@mantine/core";
import { AppWrapper } from "@/components/layout/AppWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estúdio Suculento",
  description: "Cultivo como arte e cuidado",
};

const theme = createTheme({

});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <AppWrapper>
            {children}
          </AppWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
