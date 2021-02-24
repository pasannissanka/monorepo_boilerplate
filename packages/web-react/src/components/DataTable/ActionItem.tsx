import React, { useState, useRef, useEffect } from "react";
import { usePopper } from "react-popper";

// TODO style button menu

export interface ActionItemProp {
	id: number;
	index: number;
}

export default function ActionItem(props: ActionItemProp) {
	const [actionModalToggel, setActionModalToggel] = useState(false);
	const buttonRef = useRef(null);
	const popperRef = useRef(null);
	const container = React.createRef<HTMLDivElement>();

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
	});

	const handleClickOutside = (event: any) => {
		if (container.current && !container.current.contains(event.target)) {
			setActionModalToggel(false);
		}
	};

	const handleActionModalToggle = (event: React.MouseEvent) => {
		event.stopPropagation();
		setActionModalToggel(!actionModalToggel);
	};

	const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);
	const { styles, attributes } = usePopper(
		buttonRef.current,
		popperRef.current,
		{
			modifiers: [
				{
					name: "arrow",
					options: {
						element: arrowRef,
					},
				},
				{
					name: "offset",
					options: {
						offset: [10, 0],
					},
				},
			],
		}
	);
	return (
		<React.Fragment>
			<td className="border-dashed border-t border-gray-200 px-3">
				<label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
					<button
						className="focus:outline-none rounded-md"
						ref={buttonRef}
						onClick={handleActionModalToggle}
					>
						<svg
							className="w-5 h-5 ml-1"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
							/>
						</svg>
					</button>
				</label>
				{actionModalToggel ? (
					<div ref={popperRef} style={styles.popper} {...attributes.popper}>
						<div ref={setArrowRef} style={styles.arrow} id="arrow" />
						<div
							ref={container}
							className="z-30 absolute top-0 right-0 w-40 bg-gray-100 rounded-lg shadow-lg -mr-1 block py-1 overflow-hidden"
						>
							<button
								className="w-full flex items-center justify-center bg-gray-50 hover:bg-gray-300 hover:text-blue-500 py-2 px-3 focus:outline-none focus:shadow-outline"
								onClick={() => console.log("clicked")}
							>
								test
							</button>
							<button
								className="w-full flex items-center justify-center bg-gray-50 hover:bg-gray-300 hover:text-blue-500 py-2 px-3 focus:outline-none focus:shadow-outline"
								onClick={() => console.log("clicked")}
							>
								test
							</button>
						</div>
					</div>
				) : null}
			</td>
		</React.Fragment>
	);
}
