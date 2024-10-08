'use client'
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './PlantsModal.module.scss'
import { sendDeleteRequest, sendPatchRequest, sendPostRequest } from '@/utils/requestsUtils';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import TextField from '@mui/material/TextField';
import ImageUpload from '../ImageUpload/ImageUpload';
import { Modal } from '@mui/material';
import classNames from 'classnames'


interface PlantModalProps {
  name?: string;
  room?: string;
  notes?: string;
  slug?: string;
  image?: string;
  update?: boolean;
}


export const PlantModal = (props: PlantModalProps) => {

  const errorTypes = {
    name: 'Name is required',
    serwer: 'Problem z przetworzeniem żądania'
  }

  const [name, setName] = useState<string>(props.name ?? '')
  const [room, setRoom] = useState<string>(props.room ?? '')
  const [notes, setNotes] = useState<string>(props.notes ?? '')
  const [image, setImage] = useState<File | string>()
  const [errorType, setErrorType] = useState<keyof typeof errorTypes>()
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

  const router = useRouter()

  useEffect(() => {
    if (name && errorType === 'name') {
      setErrorType(undefined)
    }
  }, [name])

  useEffect(() => {
    if (props.update) {
      if (saved) {
        setSaved(false)
      }
      if (name !== props.name || room !== props.room || notes !== props.notes) {
        setChangesMade(true)
      } else {
        setChangesMade(false)
      }
    }
  }, [name, room, notes])

  const sendNewPlant = async () => {
    if (!name) {
      setErrorType('name')
      return
    }
    const data: {[key: string]: string | File }  = {name: name, room: room, notes: notes}
    if (typeof image === 'string') {
      data.image = ''
    } else if (image === undefined) {
      data.image = ''
    } else {
      data.image = image
    }
  
    const response = await sendPostRequest(`${process.env.NEXT_PUBLIC_SOURCE}/api/plants/`, data)
    const isOk = await response.ok
    if (isOk) {
      router.push('/')
      router.refresh()
    } else {
      setErrorType('serwer')
    }
  }

  const updatePlant = async () => {
    if (!name) {
      setErrorType('name')
      return
    }
    const data: {[key: string]: string | File }  = {name: name, room: room, notes: notes}
    if (typeof image === 'string') {
      data.image = ''
    } else if (image === undefined) {
      
    } else {
      data.image = image
    }
    console.log(data)
    const response = await sendPatchRequest(`${process.env.NEXT_PUBLIC_SOURCE}/api/plants/${props.slug}/`, data)
    const isOk = await response.ok
    if (isOk) {
      setChangesMade(false)
      setSaved(true)
    } else {
      setErrorType('serwer')
    }
  }

  const deletePlant = async () => {
    const response = await sendDeleteRequest(`${process.env.NEXT_PUBLIC_SOURCE}/api/plants/${props.slug}/`)
    const isOk = await response.ok
    if (isOk) {
      router.push('/')
      router.refresh()
    } else {
      setErrorType('serwer')
    }
  }

  const goBack = async () => {
    router.push('/')
    router.refresh()
  }

  let imageSrc;
  if (image) {
    if (typeof image === 'string') {
      imageSrc = image;
    } else {
      imageSrc = URL.createObjectURL(image)
    }
  } else if (props.image) {
    imageSrc = props.image
  } else {
    imageSrc = '/icons/plant.png'
  }

  return (
    <div className={styles.PlantModal}>
      {saved && <span className={styles.Info}>Zapisano</span>}
      <div className={styles.ModalGrid}>
        <div className={styles.ImageWrapper}>
          <ImageUpload image={imageSrc} setImage={setImage}/>
        </div>
        <div className={styles.TextContent}>
          <div className={styles.InputWrapper}>
            <TextField 
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              fullWidth
              required
              error={errorType === 'name'}
              helperText={errorType === 'name'? errorTypes[errorType] : ''}
          />
          </div>
          <div className={styles.InputWrapper}>
            <TextField 
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              label="Room"
              fullWidth
          />
          </div>
          <div className={styles.NotesWrapper}>
            <TextField 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              label="Notes"
              fullWidth
              multiline
              rows={4}
          />
          </div>
        </div>
        <div className={styles.Footer}>
          <div className={styles.LeftContent}>
            {props.update && <div className={styles.DeleteButton} onClick={() => setIsDeleteModal(true)}>Usuń</div>}
          </div>
          <div className={styles.RightContent}>
            <div className={styles.CancelButton} onClick={goBack} >{changesMade ? 'Anuluj' : 'Wróć'}</div>
            <div className={styles.Button} onClick={props.update ? updatePlant : sendNewPlant}>{props.update ? 'Zapisz' : 'Dodaj'}</div>
          </div>
        </div>
      </div>
      <Modal
        open={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
      >
        <div className={styles.ModalContent}>
          <div>Czy na pewno chcesz usunąć roślinę {props.name}?</div>
          <div className={styles.Buttons}>
            <button className={classNames(styles.ModalButton, styles.No)} onClick={() => setIsDeleteModal(false)}>Nie</button>
            <button className={classNames(styles.ModalButton, styles.Yes)} onClick={deletePlant}>Tak</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
