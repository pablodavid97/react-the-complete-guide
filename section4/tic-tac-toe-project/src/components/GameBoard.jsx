import { useState } from 'react';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard({ onSquareClick, currentPlayerSymbol }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    console.log('gameBoard: ', gameBoard);

    const handleSquareClick = (rowIndex, colIndex) => {
        setGameBoard((prev) => {
            const newGameboard = [...prev.map((innerArray) => [...innerArray])];
            newGameboard[rowIndex][colIndex] = currentPlayerSymbol;
            return newGameboard;
        });
        onSquareClick();
    };
    return (
        <ol id='game-board'>
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button
                                    onClick={() =>
                                        handleSquareClick(rowIndex, colIndex)
                                    }
                                >
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
