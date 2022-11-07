import React from 'react'
import Die from './Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rollCount, setRollCount] = React.useState(0)

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  React.useEffect(() => {
    let allHeld = dice.every(die => {
      return die.isHeld === dice[0].isHeld
    })
    let allSameValue = dice.every(die => {
      return die.value === dice[0].value
    })

    if (allHeld === true && allSameValue === true) {
      setTenzies(true)
      console.log("You WOn!")
    }
  }, [dice])

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
    if (tenzies === false) {
      setDice(oldDice => {
        return oldDice.map(die => {
          return die.isHeld === true ? die : generateNewDie()
        })
      })
      setRollCount(oldRollCount => oldRollCount += 1)
      console.log(rollCount)
    }
    else {
      setRollCount(0)
      setDice(allNewDice())
      setTenzies(false)
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  return (
    <main className='main_box'>
      {tenzies && <Confetti />}
      <h1 className='title'>{tenzies ? "You won!" : "Tenzies"}</h1>
      <p className='instructions'>{!tenzies ? "Roll until all dice are the same. Click each die to freeze it at its current value between rolls." : `You used ${rollCount} rolls!`}</p>
      <div className='dice_container'>
        {diceElements}
      </div>
      <button className='btn_roll' onClick={rollDice}>{tenzies ? "Reset" : "Roll"}</button>
    </main>
  )
}

export default App
