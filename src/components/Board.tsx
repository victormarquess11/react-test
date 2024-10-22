import './Board.css';
import Square from './Square.tsx';
import { SquareSymbols } from './Game.tsx';

type BoardProps = {
    currentSymbol: SquareSymbols;
    squares: SquareSymbols[];
    onPlay: (nextSquares: SquareSymbols[]) => void;
};

export default function Board({ currentSymbol, squares, onPlay }: BoardProps) {
    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares, currentSymbol)) {
            return;
        }
        const nextSquares = squares.slice(); // copy array
        switch (currentSymbol) {
            case 'X':
                nextSquares[i] = 'O';
                break;
            case 'O':
                nextSquares[i] = 'X';
                break;
            default:
                break;
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares, currentSymbol);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${currentSymbol}`;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="win mb-1">{status}</div>
            <div className="board-row-container">
                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                </div>
            </div>
        </div>
    );
}

function calculateWinner(squares: SquareSymbols[], currentSymbol: SquareSymbols): SquareSymbols {
    const winnerLines = [
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

    for (const line of winnerLines) {
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
