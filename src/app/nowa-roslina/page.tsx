import RootLayout from "../layout";
import { snakeToCamel } from "@/utils/objectFormatters";
import { PlantsGrid } from "@/components/PlantsGrid/PlantsGrid";
import { Title } from "@/components/Title/Title";
import { PlantModal } from "@/components/PlantModal/PlantModal";


export default async function Page() {
  return (
    <>
        <Title
          title={'Nowa roślina 🌱:'}
        />
        <PlantModal />
    </>
  );
}
