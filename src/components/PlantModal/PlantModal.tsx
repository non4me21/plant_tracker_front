'use client'
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './PlantsModal.module.scss'
import { sendDeleteRequest, sendPatchRequest, sendPostRequest } from '@/utils/requestsUtils';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

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
    name: 'Nazwa jest wymagana',
    serwer: 'Problem z przetworzeniem żądania'
  }

  const [name, setName] = useState<string>(props.name ?? '')
  const [room, setRoom] = useState<string>(props.room ?? '')
  const [notes, setNotes] = useState<string>(props.notes ?? '')
  const [image, setImage] = useState<File>()
  const [errorType, setErrorType] = useState<keyof typeof errorTypes>()
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

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
    const response = await sendPostRequest(`${process.env.NEXT_PUBLIC_SOURCE}/api/plants/`, {name: name, room: room, notes: notes, image: image})
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
    const response = await sendPatchRequest(`${process.env.NEXT_PUBLIC_SOURCE}/api/plants/${props.slug}/`, {name: name, room: room, notes: notes, image: image})
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

  const backToPlants = () => {
    router.push('/')
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setImage(selectedFile)
    }
  }

  return (
    <div className={styles.PlantModal}>
      {errorType && <span className={styles.Error}>{errorTypes[errorType]}</span>}
      {saved && <span className={styles.Info}>Zapisano</span>}
      <div className={styles.ModalContent}>
        <div className={styles.InputWrapper}>
          <label>Nazwa:</label>
          <input 
            value={name}
            className={styles.NameInput}
            type='text' 
            placeholder='Palma jamajska'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.InputWrapper}>
          <label>Pokój:</label>
          <input 
            value={room}
            className={styles.RoomInput}
            type='text' 
            placeholder='Salon'
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <div className={styles.InputWrapper}>
          <label>Obrazek:</label>
          <input 
            className={styles.RoomInput}
            type='file' 
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        <div className={styles.InputWrapper}>
          <label>Notatki:</label>
          <textarea 
            value={notes ?? ''}
            className={styles.NotesInput}
            placeholder='Dwa razy w roku nawozić nawozem...'
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.Footer}>
        <div className={styles.LeftContent}>
          {props.update && <div className={styles.DeleteButton} onClick={deletePlant}>Usuń</div>}
        </div>
        <div className={styles.RightContent}>
          <div className={styles.Button} onClick={props.update ? updatePlant : sendNewPlant}>{props.update ? 'Zapisz' : 'Dodaj'}</div>
          <Link href='/'><div className={styles.CancelButton}>{changesMade ? 'Anuluj' : 'Wróć'}</div></Link>
        </div>
      </div>
    </div>
  )
}
