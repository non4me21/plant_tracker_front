import Link from 'next/link'
import styles from './NewPlantCard.module.scss'
import Image from 'next/image'

export interface Plant {
  name: string
  slug: string
  room?: string
  lastTimeWatered?: string
  image?: string
}

const NewPlantCard = ({plant}: {plant: Plant}) => {
  return (
    <div className={styles.PlantCard}>
        <Image
          className={styles.Image}
          src={plant.image ?? '/icons/plant.png'}
          alt='Plant image'
          height={140}
          width={140}
        />
      <div className={styles.PlantCardInfo}>
        <div className={styles.PlantName}>
          {plant.name}
        </div>
      </div>
    </div>
  )
}

export default NewPlantCard
