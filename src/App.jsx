import React from "react";
import Die from "./Die";
import { v4 as uuidv4 } from 'uuid';
import Confetti from 'react-confetti';

export default function App(){
    const [numbers, setNumbers] = React.useState(allNewNumbers());
    const [endGame, setEndGame] = React.useState(false);
    const [count, setCount] = React.useState(0)


    const allSelected = numbers.every(number => number.isSelected);
    const refValue = numbers[0].value;
    const allSame = numbers.every(number => number.value === refValue)
    
    React.useEffect(()=> setEndGame(allSelected && allSame ? true : false),[numbers])

    function generateNewDie(){
        return {
                value: Math.ceil(Math.random() * 6),
                isSelected: false,
                id: uuidv4()
            }
    }
    function holdDice(id){
        setNumbers(prevState => prevState.map(
            die => die.id === id?{...die, isSelected: !die.isSelected} : die))
    }
    function roll() {
        endGame? setNumbers(allNewNumbers()) : setNumbers(prevState => prevState.map(die=> die.isSelected? die : generateNewDie()
        ));
        endGame? setCount(0) : setCount(prevCount => prevCount + 1);
        
    }
    function allNewNumbers(){
        const numbersArray = []
        for(let i = 0; i < 10; i++){
            const randomNumber = Math.ceil(Math.random()*6)
            numbersArray.push(generateNewDie())
        }
        return numbersArray
    }
    const diceElements = numbers.map((die, index)=> 
    <Die 
        value={die.value} 
        key={index}
        isSelected={die.isSelected}
        holdDice={() => holdDice(die.id)}
        />)
    



    return(
        <main>
            {endGame && <Confetti />}
            <h1>{endGame? "Congrats, you won!" : "Tenzies"}</h1>
            <p>Roll until all dice are the same. <br /> Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button onClick={roll}>{endGame? "New Game" : "Roll" }</button>
            <p className="score">{endGame? `Won in ${count} rolls.` : `Rolled: ${count} times.`}</p>
        </main>
    )
}