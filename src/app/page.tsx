import { SucculentCard } from "@/components/ui/SucculentCard";
import { Grid, GridCol } from "@mantine/core";

export default function Catalogo() {
  return (
    <Grid className="flex flex-row min-h-screen items-start justify-between w-full">
      <GridCol span={2.4}>
        <SucculentCard />
      </GridCol>
      <GridCol span={2.4}>
        <SucculentCard />
      </GridCol>
      <GridCol span={2.4}>
        <SucculentCard />
      </GridCol>
      <GridCol span={2.4}>
        <SucculentCard />
      </GridCol>
      <GridCol span={2.4}>
        <SucculentCard />
      </GridCol>
      <GridCol span={2.4}>
        <SucculentCard />
      </GridCol>
      <GridCol span={2.4}>
        <SucculentCard />
      </GridCol>
    </Grid>
  );
}
