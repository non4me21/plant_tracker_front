import { BlankPlant } from "../BlankPlant/BlankPlant";
import NewPlantCard from "../NewPlantCard/NewPlantCard";
import { Plant, PlantCard } from "../PlantCard/PlantCard";
import styles from './PlantsGrid.module.scss'

export const PlantsGrid = ({plants}: {plants: Plant[]}) => {
    const mappedPlants = plants.map(plant => 
    <div className={styles.PlantCardWrapper} key={plant.slug}>
        <PlantCard 
            plant={plant}
        />
    </div>
    )
    mappedPlants.push(
        <div className={styles.PlantCardWrapper}>
            <BlankPlant />
        </div>
    )
    return (
        <div className={styles.PlantsGrid}>
            {mappedPlants}
        </div>
    )
}
