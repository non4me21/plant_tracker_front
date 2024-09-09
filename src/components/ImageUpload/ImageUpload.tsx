import { ChangeEvent, MouseEventHandler } from 'react';
import styles from './ImageUpload.module.scss'
import Image from 'next/image'
import CropFreeIcon from '@mui/icons-material/CropFree';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageUpload = ({ image, setImage }: { image: string, setImage: (image: File | string ) => void }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.type.startsWith('image/')) {
        setImage(file);
      } else {
        console.log('not good format')
      }
    }
  }

  const handleFileDelete = (event: any) => {
    event.stopPropagation()
    setImage('/icons/plant.png')
  }
  return (
    <div className={styles.ImageUpload}>
      <label htmlFor='add-image'>
        <Image
            className={styles.Image}
            src={image}
            alt='Plant image'
            width="170"
            height="170"
        />
        <CropFreeIcon className={styles.Icon} fontSize="large"/>
      </label>
      <input id='add-image' type="file" accept='image/*' onChange={handleFileChange}/>
      <DeleteIcon className={styles.DeleteIcon} fontSize="large" onClick={(event) => handleFileDelete(event)}/>
    </div>
  )
}

export default ImageUpload;
