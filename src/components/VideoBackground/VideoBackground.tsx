import styles from './VideoBackground.module.scss'

const VideoBackground = () => {
  return (
    <div className={styles.videoContainer}>
        <video className={styles.backgroundVideo} autoPlay muted loop>
            <source src="/static/green-background-blur.webm" type="video/webm" />
        </video>
    </div>
);
}

export default VideoBackground;
