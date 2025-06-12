import { useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Bold from "@tiptap/extension-bold";

const ToolbarButton = ({ onClick, active, label }) => (
  <button onClick={onClick} className={`px-3 py-1 rounded-md font-medium min-w-[80px]  ${active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}>
    {label}
  </button>
);

const ButtonStyleEditor = ({
  textColor,
  setTextColor,
  bgColor,
  setBgColor,
  isBold,
  setIsBold,
  link,
  setLink,
  buttonText,
  setButtonText,
}) => {
  const editorRef = useRef(null);

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, Bold],
    content: buttonText || "Click me",
    editorProps: {
      attributes: {
        class:
          "px-4 py-1 rounded-md focus:outline-none focus:ring-2 ring-blue-400 bg-white text-black",
      },
    },
    onUpdate: ({ editor }) => {
      setButtonText(editor.getText());
      setIsBold(editor.isActive("bold"));
    },
  });

  useEffect(() => {
    if (editor && buttonText !== editor.getText()) {
      editor.commands.setContent(buttonText);
    }
  }, [buttonText, editor]);

  const handleColorChange = (e) => {
    setTextColor(e.target.value);
    editor?.chain().focus().setColor(e.target.value).run();
  };

  if (!editor) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-2 flex gap-3 text-sm w-full max-w-3xl mt-4">
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleBold().run();
            setIsBold(!isBold);
          }}
          active={editor.isActive("bold")}
          label="Bold"
        />

        <label className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-300 text-gray-800">
          Text
          <input
            type="color"
            value={textColor}
            onChange={handleColorChange}
            className="h-5 w-5"
          />
        </label>

        <label className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-300 text-gray-800">
          Background
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="h-5 w-5"
          />
        </label>

        <div className="flex items-center gap-2">
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
            className="border  px-2 py-1 rounded-md w-48 text-black focus:outline-none focus:ring-2 ring-blue-400"
          />
        </div>
      <EditorContent editor={editor} className="text-black border rounded-md" />
   </div>
  );
};

export default ButtonStyleEditor;