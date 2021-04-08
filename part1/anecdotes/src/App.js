import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Anecdote = ({ anecdotes, selected }) => <div>{anecdotes[selected]}</div>

const DisplayVotes = ({ votes }) => <div>has {votes} votes</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleNextClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const handleVoteClick = () => {
    const newPoints = {...points}
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  const highestVotes = () => {
    const mostVotes = Math.max(...Object.keys(points).map((key) => points[key] ))
    return Object.keys(points).find(key => points[key] === mostVotes)
  }
  

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote anecdotes={anecdotes} selected={selected} />
      <DisplayVotes votes={points[selected]} />
      <Button handleClick={handleVoteClick} text='vote'/>
      <Button handleClick={handleNextClick} text='next anecdote'/>
      <Header text='Anecdote with the most votes' />
      <Anecdote anecdotes={anecdotes} selected={highestVotes()} />
    </div>
  )
}

export default App
