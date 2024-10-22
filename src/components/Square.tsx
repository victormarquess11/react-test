import type { SquareSymbols } from './Game.tsx';

type SquareProps = {
    value: SquareSymbols;
    onSquareClick: () => void;
};

export default function Square({ value, onSquareClick }: SquareProps) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}
