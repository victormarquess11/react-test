import { useState } from "react";
import { Button, Title } from "@mantine/core";

import "./Board.css";
import Square from "./Square.tsx";

export type SquareSymbols = "X" | "O" | null;

export default function Board() {
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [squares, setSquares] = useState<SquareSymbols[]>(
        Array(9).fill(null),
    );

    function handleClick(i: number) {
        if (squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    function handleRestart() {
        setSquares(Array(9).fill(null));
    }

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <Title className="mb-3">Tic Tac Toe</Title>
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
    );
}
