'use client'

import { sendPatchRequest } from '@/utils/requestsUtils'
import styles from './WaterButton.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation';


export const WaterButton = ({slug}: { slug: string}) => {
    const router = useRouter()

    const handleClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
        const data = {
            last_time_watered: new Date().toISOString()
        };
        const response = await sendPatchRequest(`http://localhost:8000/api/plants/${slug}/`, data)
        if (response.ok) {
            router.refresh()
        }
    }

    return (
        <div className={styles.WaterButton} onClick={handleClick}>
            <Image 
                src={'icons/water-drop.svg'}
                alt='Water drop icon'
                width={30}
                height={30}
            />
        </div>
    )
}
