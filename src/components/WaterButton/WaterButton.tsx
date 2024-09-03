'use client'

import { sendPatchRequest } from '@/utils/requestsUtils'
import styles from './WaterButton.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import WaterDropIcon from '@mui/icons-material/WaterDrop';


export const WaterButton = ({slug}: { slug: string}) => {
    const router = useRouter()

    const handleClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
        const data = {
            last_time_watered: new Date().toISOString()
        };
        const response = await sendPatchRequest(`${process.env.NEXT_PUBLIC_SOURCE}/api/plants/${slug}/`, data)
        if (response.ok) {
            router.refresh()
        }
    }

    return (
        <div className={styles.WaterButton} onClick={handleClick}>
            <WaterDropIcon />
        </div>
    )
}
