import './Game.css';
import { useState } from 'react';

import { Button, Title } from '@mantine/core';
import Board from './Board.tsx';

type PlayerSquareSymbols = 'X' | 'O';
export type SquareSymbols = PlayerSquareSymbols | null;

export default function Game() {
    const [history, setHistory] = useState<SquareSymbols[][]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);

    const currentSquares = history[currentMove];
    const currentSymbol: PlayerSquareSymbols = currentMove % 2 === 0 ? 'X' : 'O';

    function handlePlay(nextSquares: SquareSymbols[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((_squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move} className="flex">
                <Button
                    className="mb-1 w-36"
                    variant="filled"
                    size="sm"
                    color="rgba(52, 58, 64, 1)"
                    onClick={() => jumpTo(move)}
                >
                    {description}
                </Button>
            </li>
        );
    });

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <Title className="mb-4">Tic Tac Toe</Title>
            <div className="flex justify-start gap-10">
                <div className="game-board">
                    <Board
                        currentSymbol={currentSymbol}
                        squares={currentSquares}
                        onPlay={handlePlay}
                    ></Board>
                </div>
                <div className="game-info mt-1 flex-wrap">
                    <ol>{moves}</ol>
                </div>
            </div>
        </div>
    );
}
