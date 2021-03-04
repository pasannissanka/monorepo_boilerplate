import { convertToRaw, EditorState } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Editor.css";

export interface IPost {
	title: string;
	content: string;
}
interface AddNewPostProps {
	post: IPost;
	setPost: React.Dispatch<React.SetStateAction<IPost>>;
}

export default function AddNewPost({ post, setPost }: AddNewPostProps) {
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);

	const onEditorStateChange = (editorState: EditorState) => {
		setEditorState(editorState);
		const content = editorState.getCurrentContent();
		const rawObject = convertToRaw(content);
		const markdownString = draftToMarkdown(rawObject);
		setPost({
			...post,
			content: markdownString,
		});
	};

	return (
		<React.Fragment>
			<div className="mx-4 mt-3 h-10">
				<input
					type="text"
					name="title"
					className="w-full rounded-md border py-2 pl-5 shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium text-base "
					placeholder="Title"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setPost({ ...post, title: event.target.value })
					}
				/>
			</div>
			<div className="border rounded-md mx-4 mt-4 h-3/4">
				<Editor
					editorState={editorState}
					onEditorStateChange={onEditorStateChange}
					editorClassName={"overflow-scroll mx-2 editor-styles"}
					toolbar={{
						fontFamily: {
							options: [
								"Nanum Square",
								"Arial",
								"Georgia",
								"Impact",
								"Tahoma",
								"Verdana",
							],
						},
					}}
				/>
			</div>
		</React.Fragment>
	);
}
