import React, { useState } from 'react'
import Card from '../Card/Card';
import './Grid.css';
import isWinner from '../../helpers/CheckWinner';

function Grid({ numberOfCards}) {
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true);  //true => O, false => X
    const [winner, setWinner] = useState(null);

    function play(index) {
        if(board[index] !== "" || winner) return;

        board[index] = turn ? "O" : "X";

        const win = isWinner(board, turn ? "O" : "X");
        if(win) {
          setWinner(win);
        } else if (!board.includes("")) {
          setWinner("Draw");
        }


        setBoard([...board]);
        setTurn(!turn);

    }

    function reset() {
      setTurn(true);
      setWinner(null);
      setBoard(Array(numberOfCards).fill(""));
    }
  return (
    <div className='grid-wrapper'>
    {
      winner && (
        <>
          <h1 className='turn-highlight'>
            {winner === "Draw" ? "It's a Draw!" : `Winner is: ${winner}`}
          </h1>
          <button className='reset' onClick={reset}> Reset Game </button>
        </>
      )
    }
        <h1 className='turn-highlight'>Current Turn: {(turn ? "O" : "X" )}</h1>
    <div className='grid'>
      {board.map((el, idx) => (
        <Card gameEnd={winner ? true : false} key={idx} player={el} onPlay={play} index={idx} />
      ))}
    </div>
  </div>
  )
}

export default Grid
