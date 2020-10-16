import React, { useState } from "react";

import Board from "./components/Board";
import "./style.css";
const App = ({ size = 3 }) => {
	const [historyState, setHistoryState] = useState([
		{
			squares: Array(9).fill(null),
			location: [-1, -1],
		},
	]);
	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(true);
	const [ascSort, setAscSort] = useState(true);

	const handleClick = (i) => {
		const history = historyState.slice(0, stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = xIsNext ? "X" : "O";
		setHistoryState(
			history.concat([
				{
					squares: squares,
					location: [i % 3, Math.floor(i / 3)],
				},
			])
		);
		setStepNumber(history.length);
		setXIsNext(!xIsNext);
	};

	const jumpTo = (step) => {
		setStepNumber(step);
		setXIsNext(step % 2 === 0);
	};
	const history = historyState;
	const current = history[stepNumber];
	const winner = calculateWinner(current.squares);
	const moves = history.map((step, move) => {
		const desc = move ? "Go to move #" + move : "Go to game start";
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>
					<span style={move === stepNumber ? { color: "red" } : undefined}>
						{desc}
					</span>
				</button>
				{move ? (
					<span>
						(Col: {step.location[0] + 1}, Row: {step.location[1] + 1})
					</span>
				) : null}
				{move === stepNumber && <span style={{ color: "red" }}>(current)</span>}
			</li>
		);
	});
	let status;
	if (winner) {
		status = "Winner: " + current.squares[winner[0]];
	} else if (moves.length === 10) status = "Draw";
	else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}

	return (
		<div className="app-wrapper">
			<div>
				<h1>{status}</h1>
				<Board
					squares={current.squares}
					onClick={(i) => handleClick(i)}
					winner={winner}
					size={size}
				/>
			</div>
			<div className="game-info">
				<div>
					<button onClick={() => setAscSort(!ascSort)}>
						{ascSort ? "Sort Descend" : "Sort Ascend"}
					</button>
				</div>
				<ol>{ascSort ? moves : moves.reverse()}</ol>
			</div>
		</div>
	);
};

export default App;
// ========================================

const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return [a, b, c];
		}
	}
	return null;
};
