'use client'
import { useEffect, useState } from 'react';
import styles from './PlantsModal.module.scss'
import { sendDeleteRequest, sendPatchRequest, sendPostRequest } from '@/utils/requestsUtils';
import { useRouter } from 'next/navigation';

interface PlantModalProps {
  name?: string;
  room?: string;
  notes?: string;
  slug?: string;
  update?: boolean
}


export const PlantModal = (props: PlantModalProps) => {

  const errorTypes = {
    name: 'Nazwa jest wymagana',
    serwer: 'Problem z przetworzeniem żądania'
  }

  const [name, setName] = useState<string | undefined>(props.name)
  const [room, setRoom] = useState<string | undefined>(props.room)
  const [notes, setNotes] = useState<string | undefined>(props.notes)
  const [errorType, setErrorType] = useState<keyof typeof errorTypes | undefined>()
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
    const response = await sendPostRequest('http://localhost:8000/api/plants/', {name: name, room: room, notes: notes})
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
    const response = await sendPatchRequest(`http://localhost:8000/api/plants/${props.slug}/`, {name: name, room: room, notes: notes})
    const isOk = await response.ok
    if (isOk) {
      setChangesMade(false)
      setSaved(true)
    } else {
      setErrorType('serwer')
    }
  }

  const deletePlant = async () => {
    const response = await sendDeleteRequest(`http://localhost:8000/api/plants/${props.slug}/`)
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
    router.refresh()
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
          <div className={styles.CancelButton} onClick={backToPlants}>{changesMade ? 'Anuluj' : 'Wróć'}</div>
        </div>
      </div>
    </div>
  )
}
