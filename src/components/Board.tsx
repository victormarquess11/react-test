import { useState } from "react";
import { Button, Title } from "@mantine/core";

import "./Board.css";
import Square from "./Square.tsx";

type PlayerSquareSymbols = "X" | "O";
export type SquareSymbols = PlayerSquareSymbols | null;

export default function Board() {
    const [win, setWin] = useState<SquareSymbols>(null);
    const [currentSymbol, setCurrentSymbol] =
        useState<PlayerSquareSymbols>("X");
    const [squares, setSquares] = useState<SquareSymbols[]>(
        Array(9).fill(null),
    );

    function handleClick(i: number) {
        if (squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        let nextSymbol: SquareSymbols = null;

        switch (currentSymbol) {
            case "X":
                nextSquares[i] = "X";
                nextSymbol = "O";
                break;
            case "O":
                nextSquares[i] = "O";
                nextSymbol = "X";
                break;
            default:
                break;
        }

        setSquares(nextSquares);
        if (calculateWinner(nextSquares) != null) {
            setWin(currentSymbol);
        }
        if (nextSymbol) {
            setCurrentSymbol(nextSymbol);
        }
    }

    function handleRestart() {
        setSquares(Array(9).fill(null));
        setWin(null);
        setCurrentSymbol("X");
    }

    function calculateWinner(squares: SquareSymbols[]): SquareSymbols {
        const lines = [
            // horizontal
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // vertical
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // diagonal
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const line of lines) {
            let counter = 0;
            for (const number of line) {
                if (squares[number] === currentSymbol) {
                    counter++;
                    if (counter === line.length) {
                        return currentSymbol;
                    }
                }
            }
        }
        return null;
    }

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <Title className="mb-2">Tic Tac Toe</Title>
            <div className="win">
                {win ? `Winner: ${win}` : `Next player: ${currentSymbol}`}
            </div>
            <div className="board-row-container">
                <div className="board-row">
                    <Square
                        value={squares[0]}
                        onSquareClick={() => handleClick(0)}
                    />
                    <Square
                        value={squares[1]}
                        onSquareClick={() => handleClick(1)}
                    />
                    <Square
                        value={squares[2]}
                        onSquareClick={() => handleClick(2)}
                    />
                </div>
                <div className="board-row">
                    <Square
                        value={squares[3]}
                        onSquareClick={() => handleClick(3)}
                    />
                    <Square
                        value={squares[4]}
                        onSquareClick={() => handleClick(4)}
                    />
                    <Square
                        value={squares[5]}
                        onSquareClick={() => handleClick(5)}
                    />
                </div>
                <div className="board-row"></div>

                <Square
                    value={squares[6]}
                    onSquareClick={() => handleClick(6)}
                />
                <Square
                    value={squares[7]}
                    onSquareClick={() => handleClick(7)}
                />
                <Square
                    value={squares[8]}
                    onSquareClick={() => handleClick(8)}
                />
            </div>
            <div className="button-container">
                <Button
                    className="my-2"
                    variant="filled"
                    size="sm"
                    color="rgba(52, 58, 64, 1)"
                    onClick={handleRestart}
                >
                    Restart
                </Button>
            </div>
        </div>
    );
}
