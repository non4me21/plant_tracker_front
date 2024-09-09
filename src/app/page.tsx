import RootLayout from "./layout";
import { snakeToCamel } from "@/utils/objectFormatters";
import { PlantsGrid } from "@/components/PlantsGrid/PlantsGrid";
import { Title } from "@/components/Title/Title";
import BasicLayout from "@/containers/BasicLayout";
import Link from 'next/link'
import Button from '@mui/material/Button';

export const generateMetadata = () => {
  return {
    "title": "Take a look at your plants",
    "description": "User's all plants in a grid display"
  }
}

const getPlants = async () => {
  const data = await fetch(`${process.env.NEXT_SOURCE}/api/plants/`, {cache: 'no-store'})
  const plants = await data.json()
  return snakeToCamel(plants)
}

export default async function Page() {
  const plants = await getPlants()
  
  return (
    <>
      <PlantsGrid 
        plants={plants}
      />
    </>
  );
}
