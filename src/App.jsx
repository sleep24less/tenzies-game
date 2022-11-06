import React from 'react'
import Die from './Die'
import { nanoid } from "nanoid"

function App() {

  const [dice, setDice] = React.useState(allNewDice())

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    setDice(oldDice => {
      return oldDice.map(die => {
        return die.isHeld === true ? die : generateNewDie()
      })
    })
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  return (
    <main className='main_box'>
      <div className='dice_container'>
        {diceElements}
      </div>
      <button className='btn_roll' onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
