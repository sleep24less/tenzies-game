import React from 'react'
import Die from './Die'
import { nanoid } from "nanoid"

function App() {

  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function rollDice() {
    setDice(allNewDice())
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      if (die.id === id) {
        return {
          ...die,
          isHeld: !die.isHeld
        }
      }
      else {
        return die
      }
    }))
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

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
