import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad, clicks }) => {

  const average = () => clicks.sum/clicks.count
  const positivePercentage = () => clicks.positiveCount/clicks.count * 100 + ' %'

  if (clicks.count === 0) {
    return (
      <div>
        <Header text='statistics' />
        no feedback given
      </div>
    )
  }

  return (
    <div>
      <Header text='statistics' />
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={clicks.count} />
          <Statistic text='average' value={average()} />
          <Statistic text='positive' value={positivePercentage()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [clicks, setClicks] = useState({count: 0, sum:0, positiveCount: 0})

  const handleGoodClick = () => {
    const newClicks = {
      count: clicks.count + 1,
      sum: clicks.sum + 1,
      positiveCount: clicks.positiveCount + 1
    }
    setClicks(newClicks)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    const newClicks = {
      ...clicks,
      count: clicks.count + 1
    }
    setClicks(newClicks)
    setNeutral(neutral + 1)
  }
  
  const handleBadClick = () => {
    const newClicks = {
      ...clicks,
      count: clicks.count + 1,
      sum: clicks.sum - 1
    }
    setClicks(newClicks)
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} clicks={clicks}/>
    </div>
  )
}

export default App