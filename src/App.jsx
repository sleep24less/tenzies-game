import React from 'react'
import Die from './Die'

function App() {

  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return newDice
  }

  function rollDice() {
    setDice(allNewDice())
  }

  const diceElements = dice.map(die => <Die value={die.value} />)

  console.log(dice)

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
