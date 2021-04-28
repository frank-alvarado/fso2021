import React from 'react'

const Notification = ({ message, type }) => {
    if (message === '') {
        return null
    }

    const typeColor = type ? 'red' : 'green'

    const notification = {
        color: typeColor,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={notification}>
            {message}
        </div>
    )
}

export default Notification