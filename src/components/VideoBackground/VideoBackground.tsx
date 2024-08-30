import styles from './VideoBackground.module.scss'

const VideoBackground = () => {
  return (
    <div className={styles.videoContainer}>
        <video className={styles.backgroundVideo} preload='auto' autoPlay muted loop>
            <source src="/static/green-background-loop-final.mp4" type="video/mp4" />
        </video>
    </div>
);
}

export default VideoBackground;
