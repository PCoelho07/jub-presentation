import "./style.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";

function CustomEditor({ onChange, name }) {
  const editor = useEditor({
    onUpdate: ({ editor }) => {
      const contentHtml = editor.getHTML();
      onChange(contentHtml);
    },
    extensions: [
      StarterKit
    ],
  }, []);

  return (<><EditorContent editor={editor} name={name} /></>);
}

export default CustomEditor;
