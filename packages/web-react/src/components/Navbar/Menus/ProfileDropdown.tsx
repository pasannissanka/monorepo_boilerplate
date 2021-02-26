import React from "react";
import { Link, useHistory } from "react-router-dom";
import { MeDocument, useLogoutMutation } from "../../../generated/graphql";
import { client } from "../../../lib/init-apollo";

interface ProfileDropdownProps {}

export default function ProfileDropdown(props: ProfileDropdownProps) {
  const [logout] = useLogoutMutation();
	const history = useHistory();

	const handleLogOut = async () => {
		try {
			client.resetStore();
			await logout();
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};
  
  const me = client.readQuery({
		query: MeDocument,
	});
  
	return (
		<div className="z-20 absolute mt-3 transform -translate-x-full bg-white rounded-md shadow-lg min-w-max">
			<div className="flex flex-col p-4 space-y-1 font-medium border-b">
				<span className="text-gray-800">{me?.me.user.username}</span>
				<span className="text-sm text-gray-400">{me?.me.user.email}</span>
			</div>
			<ul className="flex flex-col p-2 my-2 space-y-1">
				<li>
					<Link
						to="/profile"
						className="block px-2 py-1 transition rounded-md hover:bg-gray-100"
					>
						Profile
					</Link>
				</li>
				<li>
					<Link
						to="/"
						className="block px-2 py-1 transition rounded-md hover:bg-gray-100"
					>
						Another Link
					</Link>
				</li>
			</ul>
			<div className="flex items-center justify-center p-4 text-blue-700 underline border-t">
				<button onClick={handleLogOut}>Logout</button>
			</div>
		</div>
	);
}
