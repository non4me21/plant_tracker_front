import Image from "next/image";
import styles from "./page.module.scss";
import RootLayout from "./layout";
import { snakeToCamel } from "@/utils/objectFormatters";
import { PlantsGrid } from "@/components/PlantsGrid/PlantsGrid";
import { Title } from "@/components/Title/Title";

const getPlants = async () => {
  const data = await fetch('http://web:8000/api/plants/', { cache: 'no-store' })
  const plants = await data.json()
  return snakeToCamel(plants)
}

export default async function Page() {
  const plants = await getPlants()
  return (
    <RootLayout>
        <Title
          title={'Twoje roślinki 🌱:'}
        />
        <PlantsGrid 
          plants={plants}
        />
    </RootLayout>
  );
}
