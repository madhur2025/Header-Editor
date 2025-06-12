import { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import { FontSize } from '../extensions/FontSize';


// this is buttons or edit menu
const ToolbarButton = ({ onClick, active, label }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-md font-medium min-w-[80px] 
    ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
    {label}
  </button>
);

const RichTextEditor = () => {

  const [isFocused, setIsFocused] = useState(false);
  const editorWrapperRef = useRef(null);

  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, Color, FontSize, Link.configure({ openOnClick: false })],
    content: '<p>Title</p>',
  });
  
  // this handles outside clicks for show or hide edit menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editorWrapperRef.current && !editorWrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const setColor = (color) => editor?.chain().focus().setColor(color).run();
  const setFontSize = (size) => editor?.chain().focus().setFontSize(size).run();
  const setLink = () => {
    const url = window.prompt('Enter URL');
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  };
  const removeLink = () => editor?.chain().focus().unsetLink().run();

  return (
    <div ref={editorWrapperRef} className="relative">
      {isFocused && (
        <div className="bg-white shadow-md rounded-lg px-2 py-2 flex flex-wrap justify-start items-center gap-3 z-20 m-3 text-sm text-black">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} label="Bold" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} label="Italic" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} label="Underline" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} label="Strike" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} label="Code" />
          <ToolbarButton onClick={setLink} label="Add Link" />
          <ToolbarButton onClick={removeLink} label="Remove Link" />

          <label className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-300 text-gray-800 min-w-[60px]">
            Text
            <input type="color" onChange={(e) => setColor(e.target.value)} className="h-5 w-5"/>
          </label>

          <select
            onChange={(e) => setFontSize(e.target.value)}
            className="text-gray-800 font-medium px-2 py-1 rounded-md text-sm bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition min-w-[70px]"
          >
            {[10, 12, 14, 18, 20, 24, 30, 36, 40, 46, 80].map((size) => (
              <option key={size} value={`${size}px`}>{size}px</option>
            ))}
          </select>
        </div>
      )}

      <EditorContent
        editor={editor}
        onFocus={() => setIsFocused(true)}
        className="text-black p-3 rounded-xl"
      />
    </div>
  );
};

export default RichTextEditor;