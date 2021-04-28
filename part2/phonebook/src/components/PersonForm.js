import React from 'react'
import personsService from '../services/persons'

const PersonForm = ({ persons, name, number, setName, setNumber, setPersons, setNotificationMessage, setNotificationType }) => {

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === name)) {
      if (window.confirm(`${name} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === name)
        const changedPerson = { ...person, number: number }

        personsService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
          .catch(error => {
            console.log(error)
          })
        setNumber('')
      }
    } else {
      const newPerson = { name: name, number: number }
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setNotificationType(false)
          setTimeout(() => {
            setNotificationMessage('')
          }, 5000)
        })
      setNumber('')
    }
    setName('')
  }

  const handleNameChange = (event) => setName(event.target.value)
  const handleNumberChange = (event) => setNumber(event.target.value)

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={number}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm