import React, { useState, useEffect } from "react";
import "./style.css";

const calculateWinner = (board) => {
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
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[a];
		}
	}
	return null;
};

const App = ({ size = 3 }) => {
	const [board, setBoard] = useState(new Array(size * size).fill(null));
	const [isCurrentX, setIsCurrentX] = useState(false);
	const [winner, setWinner] = useState(null);
	const reset = () => {
		setBoard(new Array(size * size).fill(null));
		setWinner(null);
	};
	useEffect(() => {
		setWinner(calculateWinner(board));
	}, [board]);

	const handleClick = (cellId) => {
		if (!board[cellId]) {
			const current = isCurrentX ? "X" : "O";
			setBoard(() => board.map((cell, id) => (cellId === id ? current : cell)));
			setIsCurrentX(!isCurrentX);
		}
	};
	return (
		<div className="app-wrapper">
			<h2 className="status-wrapper">
				{winner
					? "Winner: " + winner
					: "Next Player: " + (isCurrentX ? "X" : "O")}
			</h2>
			<div
				className="board-wrapper"
				style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
			>
				{board.map((cell, cellId) => (
					<button
						className="cell-wrapper"
						disabled={winner ? true : false}
						key={cellId}
						onClick={() => handleClick(cellId)}
					>
						{cell}
					</button>
				))}
			</div>
			<button onClick={reset} className="btn-reset">
				Restart
			</button>
		</div>
	);
};

export default App;
