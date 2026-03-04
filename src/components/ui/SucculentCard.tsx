import { Button, Card, CardSection, Image, Text } from '@mantine/core';

export const SucculentCard = () => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
      w="max-content"
    >
      <CardSection>
        <Image
          src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          h={160}
          alt="No way!"
        />
      </CardSection>

      <Text fw={500} size="lg" mt="md">
        Echeveria Teste
      </Text>

      <Button variant="outline" mt="lg" c="dimmed" size="sm">
        Reservar
      </Button>
    </Card>
  );
}
