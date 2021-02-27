import React from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

interface AddNewPostProps {}

export default function AddNewPost(props: AddNewPostProps) {
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);

	return (
		<React.Fragment>
			<div className="border mt-8 mx-2 h-3/4">
				<Editor editorState={editorState} onChange={setEditorState} />
			</div>
		</React.Fragment>
	);
}
