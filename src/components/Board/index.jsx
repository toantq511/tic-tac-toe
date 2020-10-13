import React from "react";
import Square from "../Square";

const Board = (props) => {
	const renderSquare = (i) => (
		<Square
			value={props.squares[i]}
			onClick={() => props.onClick(i)}
			key={i}
			isWin={props.winner?.includes(i)}
		/>
	);
	return (
		<div className="board-wrapper">
			<div className="col-label" style={{ marginLeft: "3rem" }}>
				{[1, 2, 3].map((item) => (
					<span
						style={{
							width: "5rem",
							display: "inline-block",
							textAlign: "center",
						}}
						key={item}
					>
						Column {item}
					</span>
				))}
			</div>
			{[0, 1, 2].map((item) => (
				<div className="board-row" key={item}>
					<span
						className="row-label"
						style={{ width: "3rem", display: "inline-block" }}
					>
						Row {item + 1}
					</span>
					{[0, 1, 2].map((subItem) => renderSquare(subItem + item * 3))}
				</div>
			))}
		</div>
	);
};

export default Board;
