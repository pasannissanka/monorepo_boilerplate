import React from "react";

interface QuickActionCardProps {
	heading: string;
	subHeading: string;
	count: number;
}

export default function QuickActionCard({
	heading,
	subHeading,
	count = 0,
}: QuickActionCardProps) {
	return (
		<React.Fragment>
			<div className="flex-shrink-0 m-3 relative overflow-hidden bg-yellow-500 rounded-lg max-w-lg w-48 shadow-lg">
				<div className="relative text-white px-6 pb-6 mt-6">
					<span className="block opacity-75 -mb-1">{heading}</span>
					<div className="flex justify-between">
						<span className="block font-semibold text-xl">{subHeading}</span>
						<span className="block bg-white rounded-full text-yellow-500 text-base font-bold px-3 py-2 leading-none items-center ml-4">
							{count}
						</span>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
