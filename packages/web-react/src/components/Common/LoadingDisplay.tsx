import React from "react";
import { ReactComponent as LoadingSVG } from "../../Assets/loading_undraw.svg";

interface LoadingDisplayProps {
	text?: string;
}

export default function LoadingDisplay({
	text = "Loading",
}: LoadingDisplayProps) {
	return (
		<div className="flex justify-center">
			<div className="row mt-10">
				<LoadingSVG className="w-48 h-48 justify-center" />
				<span className="text-xl flex justify-center mt-5 mb-10 text-gray-600">
					{text}
				</span>
			</div>
		</div>
	);
}
