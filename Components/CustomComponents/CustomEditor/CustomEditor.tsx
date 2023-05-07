import { Editor } from "react-draft-wysiwyg";
import AddParameterButton from "../../NotificaitonChannel/AddParameterButton";

const CustomEditor = (props: any) => {
  const handleLangEditorChange = (e: any) => {
    props.handleLangEditorChange(e);
  };
  const contentHandler = (identifier: string, type: string) => {
    props.contentValue(identifier, type, props.addLanguage);
  };

  return (
    <Editor
      editorState={props.editorState}
      toolbarClassName={"d-flex justify-content-between"}
      editorClassName="editor-content"
      onEditorStateChange={handleLangEditorChange}
      toolbarCustomButtons={
        props.addParameter && [
          <AddParameterButton
            parameters={props.parameters}
            handleContent={(identifier: any, type: any) =>
              contentHandler(identifier, type)
            }
            content={props.content}
          />,
        ]
      }
      toolbar={{
        options: [
          "inline",
          "colorPicker",
          "emoji",
          "textAlign",
          "list",
          "image",
          "link",
          "history",
        ],
        inline: {
          inDropdown: false,
          className: "ms-4",
          options: ["bold", "italic", "underline", "strikethrough"],
        },
        textAlign: {
          inDropdown: true,
          className: "mt-2 ms-5",
          options: ["left", "center", "right", "justify"],
        },
        image: {
          inDropdown: false,
          className: "ms-5",
        },
        link: {
          options: ["link"],
        },
      }}
    />
  );
};

export default CustomEditor;
