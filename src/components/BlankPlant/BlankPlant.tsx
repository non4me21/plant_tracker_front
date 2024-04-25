import Link from 'next/link'
import styles from './BlankPlant.module.scss'
import Image from 'next/image'

export const BlankPlant = () => {
    return (
        <Link className={styles.BlankPlant}
        href={'/nowa-roslina'}
        >
            <Image 
                src={'icons/plus-circle-svgrepo-com.svg'}
                alt='Plus Icon'
                width={45}
                height={45}
            />
        </Link>
    )
}