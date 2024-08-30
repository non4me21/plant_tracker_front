import RootLayout from "../../layout";
import { snakeToCamel } from "@/utils/objectFormatters";
import { PlantsGrid } from "@/components/PlantsGrid/PlantsGrid";
import { Title } from "@/components/Title/Title";
import { PlantModal } from "@/components/PlantModal/PlantModal";

const getPlantData = async (slug: string) => {
  const data = await fetch(`${process.env.NEXT_SOURCE}/api/plants/${slug}`, { cache: 'no-store' })
  const plants = await data.json()
  return snakeToCamel(plants)
}


export default async function Page( {params}: {params: {slug: string}}) {
  const plantData = await getPlantData(params.slug)
  return (
    <RootLayout>
        <Title
          title={`${plantData.name} 🌱:`}
        />
        <PlantModal 
          name={plantData.name}
          room={plantData.room}
          notes={plantData.notes}
          slug={plantData.slug}
          image={plantData.image}
          update
        />
    </RootLayout>
  );
}
