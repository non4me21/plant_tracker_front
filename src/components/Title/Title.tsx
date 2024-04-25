import styles from './Title.module.scss'

export const Title = ({title}: {title: string}) => {
    return <span className={styles.Title}>{title}</span>
}