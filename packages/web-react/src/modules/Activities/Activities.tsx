import React from "react";

interface ActivitiesProps {}

export default function Activities(props: ActivitiesProps) {
	return (
		<React.Fragment>
			<div className="container mx-auto px-4">
				<h1 className="text-3xl py-4 mb-1">Recent Activities</h1>

				{/* TODO : Filter bar */}

				<div className="flex bg-white shadow-lg rounded-lg md:mx-auto max-w-md md:max-w-3xl">
					<div className="flex items-start px-4 py-6 w-full">
						<img
							className="w-12 h-12 rounded-full object-cover mr-4 shadow"
							src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
							alt="avatar"
						/>
						<div className="w-full">
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-semibold text-gray-900 -mt-1">
									Brad Adams{" "}
								</h2>
								<small className="text-sm text-gray-700">22h ago</small>
							</div>
							{/* <p className="text-gray-700">Joined 12 SEP 2012. </p> */}
							<p className="mt-3 text-gray-700 text-sm">
								Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor
								sit amet!
							</p>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
