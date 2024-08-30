import { capitalizeString } from '@/utils/textFormatters'
import { WaterButton } from '../WaterButton/WaterButton'
import styles from './PlantCard.module.scss'
import { formatDate } from '@/utils/objectFormatters'
import Link from 'next/link'

export interface Plant {
    name: string
    slug: string
    room?: string
    lastTimeWatered?: string
}


export const PlantCard = ({plant}: { plant: Plant }) => {

    const date = plant.lastTimeWatered && formatDate(plant.lastTimeWatered).split(' ')

    return (
        <div className={styles.PlantCard}>
            <Link 
                className={styles.PlantInfo}
                href={`/roslina/${plant.slug}`}
                passHref
            >
                <div className={styles.PlantNameWrapper}>
                    <span className={styles.PlantName}>{plant.name}</span>
                    {plant.room && 
                    <span className={styles.PlantRoom}>{capitalizeString(plant.room)}</span>}
                </div>
                {plant.lastTimeWatered && 
                <div className={styles.PlantLast}>
                    <span className={styles.PlantLastText}>Ostatnie podlanie:</span>
                    <div className={styles.PlantLastData}>
                        <span className={styles.PlantLastDate}>{date![0]}</span>
                        <span className={styles.PlantLastTime}>{date![1]}</span>
                    </div>
                </div>
                }
            </Link>
            <WaterButton 
                slug={plant.slug}
            />
        </div>
    )
}
