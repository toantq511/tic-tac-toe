import React from "react";

import Board from "./components/Board";
import "./style.css";
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					squares: Array(9).fill(null),
					location: [-1, -1],
				},
			],
			stepNumber: 0,
			xIsNext: true,
			ascSort: true,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? "X" : "O";
		this.setState({
			history: history.concat([
				{
					squares: squares,
					location: [i % 3, Math.floor(i / 3)],
				},
			]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: step % 2 === 0,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		const moves = history.map((step, move) => {
			const desc = move ? "Go to move #" + move : "Go to game start";
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>
						<span
							style={
								move === this.state.stepNumber ? { color: "red" } : undefined
							}
						>
							{desc}
						</span>
					</button>
					{move ? (
						<span>
							(Col: {step.location[0] + 1}, Row: {step.location[1] + 1})
						</span>
					) : null}
					{move === this.state.stepNumber && (
						<span style={{ color: "red" }}>(current)</span>
					)}
				</li>
			);
		});
		let status;
		if (winner) {
			status = "Winner: " + current.squares[winner[0]];
		} else if (moves.length === 10) status = "Draw";
		else {
			status = "Next player: " + (this.state.xIsNext ? "X" : "O");
		}
		return (
			<div className="app-wrapper">
				<h1>{status}</h1>
				<Board
					squares={current.squares}
					onClick={(i) => this.handleClick(i)}
					winner={winner}
				/>
				<div className="game-info">
					<div>
						<button
							onClick={() =>
								this.setState((state) => ({ ascSort: !state.ascSort }))
							}
						>
							{this.state.ascSort ? "Sort Descend" : "Sort Ascend"}
						</button>
					</div>
					<ol>{this.state.ascSort ? moves : moves.reverse()}</ol>
				</div>
			</div>
		);
	}
}

export default App;
// ========================================

function calculateWinner(squares) {
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
}
