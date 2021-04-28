import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType}></Notification>
      <Filter filter={newFilter} setFilter={setNewFilter} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} name={newName} setName={setNewName} number={newNumber} setNumber={setNewNumber} setNotificationMessage={setNotificationMessage} setNotificationType={setNotificationType}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} setPersons={setPersons} setNotificationMessage={setNotificationMessage} setNotificationType={setNotificationType} />
    </div>
  )
}

export default App