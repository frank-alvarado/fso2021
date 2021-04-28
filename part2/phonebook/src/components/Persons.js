import React from 'react'
import personsService from '../services/persons'

const Person = ({ person, deletePerson }) => {
    return (
        <li>
            {person.name}
            {person.number}
            <button onClick={deletePerson}>delete</button>
        </li>
    )
}

const Persons = ({ persons, filter, setPersons, setNotificationMessage, setNotificationType }) => {
    const deletePerson = person => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            personsService
                .deletePerson(person.id)
                .then(status => {
                    if (status === 200) {
                        setPersons(persons.filter(p => p.id !== person.id))
                    }
                })
                .catch(error => {
                    setNotificationMessage(`Information of ${person.name} has already been removed from the server`)
                    setNotificationType(true)
                    setTimeout(() => {
                        setNotificationMessage('')
                    }, 5000)
                    setPersons(persons.filter(p => p.id !== person.id))
                })
        }
    }

    return (
        <ul>
            {persons.filter(p => p.name.includes(filter)).map(person =>
                <Person
                    key={person.name}
                    person={person}
                    deletePerson={() => deletePerson(person)}
                />
            )}
        </ul>
    )
}

export default Persons