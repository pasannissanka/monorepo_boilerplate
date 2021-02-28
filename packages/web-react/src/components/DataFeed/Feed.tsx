import React from "react";
import { useDataTableContext } from "../DataTable/Context/DataTableContext";

interface FeedProps {}

export default function Feed(props: FeedProps) {
	const { dataList } = useDataTableContext();
	return (
		<React.Fragment>
			{dataList.map((item, index) => (
				<div key={item.id} className="flex bg-white shadow rounded-lg md:mx-auto max-w-md md:max-w-3xl mt-3">
					<div className="flex items-start px-4 py-6 w-full">
						<img
							className="w-12 h-12 rounded-full object-cover mr-4 shadow"
							src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
							alt="avatar"
						/>
						<div className="w-full">
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-semibold text-gray-900 -mt-1">
									{item.user.username}
								</h2>
								<small className="text-sm text-gray-700">22h ago</small>
							</div>
							<p className="mt-3 text-gray-700 text-sm">{item.message}</p>
						</div>
					</div>
				</div>
			))}
		</React.Fragment>
	);
}
