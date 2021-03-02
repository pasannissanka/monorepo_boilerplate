import React, { useEffect, useState } from "react";
import ModalPanel from "../../components/ModalPanel/ModelPanel";
import {
	useGetPostsQuery,
	useCreatePostMutation,
} from "../../generated/graphql";
import AddNewPost, { IPost } from "./AddNewPost/AddNewPost";

import {
	DataTable,
	ElementAction,
	LabelKeyValue,
	SearchFields,
} from "@solvedcard/ui/lib/src";

interface UsersProps {}

export default function Posts(props: UsersProps) {
	const [modalToggle, setmodalToggle] = useState(false);

	const [search, setSearch] = useState<SearchFields>({
		search: "",
		searchBy: "all",
		limit: 5,
		offset: 0,
	});

	const [post, setPostState] = useState<IPost>({
		title: "",
		content: "",
	});

	const [labelState, setLabelState] = useState<LabelKeyValue[]>([
		{
			key: "title",
			value: "Tile",
			selected: true,
		},
		{
			key: "content",
			value: "Content",
			selected: true,
		},
		{
			key: "id",
			value: "ID",
			selected: false,
		},
	]);
	const [searchFields, setSearchFields] = useState<LabelKeyValue[]>([
		{
			key: "title",
			value: "Title",
			selected: true,
		},
		{
			key: "all",
			value: "All",
			selected: false,
		},
	]);
	const eleActions: ElementAction[] = [
		{
			action: (key: number, event?: any) => {
				console.log("1", key);
			},
			title: "Test Action 1",
			svg: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					className="w-4 h-4" // Required!
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
			),
		},
		{
			action: (key?: number, event?: any) => {
				console.log("2", key);
			},
			title: "Test Action 2",
			svg: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					className="w-4 h-4" // Required!
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					/>
				</svg>
			),
		},
	];

	const { data, loading } = useGetPostsQuery({
		variables: {
			[search.searchBy]: search.search,
			limit: search.limit,
			offset: search.offset,
		},
		fetchPolicy: "cache-and-network",
	});

	const [dataList, setdataList] = useState<any>([]);

	useEffect(() => {
		if (data?.getPosts) {
			setdataList([
				...data!.getPosts.posts.map((post) => {
					return {
						...post,
						selected: false,
					};
				}),
			]);
		}
	}, [data]);

	const totalCount = data?.getPosts.count;

	const [createPostMutation] = useCreatePostMutation();

	const createNewPost = () => {
		createPostMutation({
			variables: post,
		})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => console.log(err));
	};
	return (
		<React.Fragment>
			<div className="container mx-auto px-4">
				<h1 className="text-3xl py-4 mb-1">Posts</h1>

				<DataTable
					{...{
						eleActions,
						loading,
						totalCount,
						setSearch,
						search,
						dataList,
						setdataList,
						labelState,
						setLabelState,
						searchFields,
						setSearchFields,
					}}
					globalActions={
						<div className="ml-2">
							<button
								className="shadow rounded-lg inline-flex items-center bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline text-gray-500 font-semibold py-2 px-2 md:px-4 text-sm"
								onClick={() => setmodalToggle(!modalToggle)}
							>
								<span className="hidden md:block">New</span>
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
										d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
							</button>
						</div>
					}
				/>
			</div>

			{modalToggle ? (
				<ModalPanel
					title="Create New Post"
					closeAction={setmodalToggle}
					size="large"
					titleSVG={
						<svg
							className="w-8 h-8"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					}
					footerContent={
						<button onClick={() => createNewPost()}>Submit</button>
					}
				>
					<AddNewPost post={post} setPost={setPostState} />
				</ModalPanel>
			) : null}
		</React.Fragment>
	);
}
