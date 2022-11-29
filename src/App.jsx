import React from 'react'
import Die from './Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = React.useState(allNewDice())

  // Is the game won yet
  const [tenzies, setTenzies] = React.useState(false)
  // Stores how many rolls are used during the game
  const [rollCount, setRollCount] = React.useState(0)

  // Generate all the dice for the initial load of site
  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  // Every roll checks if all held dice are the same, if true sets tenzies state to true = game won //
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

  // Generates new single random die
  function generateNewDie() {
    return {
      // Value is randomized
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  // Generates new dice
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  // Checks if the game is won yet, if not rolls the dice
  function rollDice() {
    if (tenzies === false) {
      setDice(oldDice => {
        //checks if the die is held, if not rolls a new one
        return oldDice.map(die => {
          return die.isHeld === true ? die : generateNewDie()
        })
      })
      // Sets how many rolls are made during the game
      setRollCount(oldRollCount => oldRollCount += 1)
      console.log(rollCount)
    }
    // Game is won, rollCount reset, old dice replaced with new ones, game won state reset //
    else {
      setRollCount(0)
      setDice(allNewDice())
      setTenzies(false)
    }
  }

  // onClick function to freeze the die so it cant be rolled
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
