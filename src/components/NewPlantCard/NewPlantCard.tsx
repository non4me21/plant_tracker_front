import Link from 'next/link'
import styles from './NewPlantCard.module.scss'
import Image from 'next/image'
import { Divider } from '@mui/material'
import { WaterButton } from '../WaterButton/WaterButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { propagateServerField } from 'next/dist/server/lib/render-server';

export interface Plant {
  name: string;
  slug: string;
  room?: string;
  lastTimeWatered?: string;
  image?: string;
  notes?: string;
}

const NewPlantCard = ({plant}: {plant: Plant}) => {

  let notes = plant.notes
  if (notes && notes.length > 50) {
    notes = notes.slice(0, 50) + '...'
  }

  let dateLabel;
  if (plant.lastTimeWatered) {
    const date = new Date(plant.lastTimeWatered)
    dateLabel = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  }

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
        <div className={styles.NameRoomInfo}>
          <span className={styles.Name}>{plant.name}</span>
          {plant.room && 
          <>
            <Divider flexItem/>
            <span>{plant.room}</span>
          </>
          }
        </div>
        <div className={styles.LastWatering}>
          <span>Last watered: {dateLabel ?? 'Never'}</span>
        </div>
        {plant.notes &&
          <>
            <div className={styles.Notes}>
              {notes}
            </div>
            {plant.notes.length > 50 && <div className={styles.NotesPopover}>{plant.notes}</div>}
          </>
        }
      </div>
      <div className={styles.ButtonsWrapper}>
        <WaterButton slug={plant.slug}/>
        <Link className={styles.EditButton} href={`/roslina/${plant.slug}`}>
            <EditNoteIcon /> 
        </Link>
      </div>
    </div>
  )
}

export default NewPlantCard
