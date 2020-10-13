import React from "react";

const Square = (props) => (
	<button
		className="square-wrapper"
		onClick={props.onClick}
		style={props.isWin ? { backgroundColor: "green" } : undefined}
	>
		{props.value || "​ "}
	</button>
);

export default Square;
