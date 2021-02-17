import React from "react";
import { useHistory } from "react-router-dom";
import { useLogoutMutation } from "../../generated/graphql";

interface ListItemLinkProps {}

export default function Drawer(props: ListItemLinkProps) {
	const [logout] = useLogoutMutation();
	const history = useHistory();

	const handleLogOut = async () => {
		try {
			await logout();
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<React.Fragment>
			<aside
				className={`fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none
			`}
			>
				<div className="flex items-center justify-between flex-shrink-0 p-2">
					<span className="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap">
						SolvedCard
					</span>
					<button className="p-2 rounded-md lg:hidden">
						<svg
							className="w-6 h-6 text-gray-600"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<nav className="flex-1 overflow-hidden hover:overflow-y-auto">
					<ul className="p-2 overflow-hidden">
						<li>
							<a
								href="/"
								className="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100"
							>
								<span>
									<svg
										className="w-6 h-6 text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
										/>
									</svg>
								</span>
								<span>Dashboard</span>
							</a>
						</li>
					</ul>
				</nav>
				<div className="flex-shrink-0 p-2 border-t max-h-14">
					<button
						onClick={handleLogOut}
						className="flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase bg-gray-100 border rounded-md focus:outline-none focus:ring"
					>
						<span>
							<svg
								className="w-6 h-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
						</span>
						<span> Logout </span>
					</button>
				</div>
			</aside>
		</React.Fragment>
	);
}
