import "./style.css";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";

function CustomEditor({ onChange, content, name }) {
  const [firstSetContent, setFirstContent] = useState(false)
  const editor = useEditor({
    content,
    onUpdate: ({ editor }) => {
      const contentHtml = editor.getHTML();
      onChange(contentHtml);
    },
    extensions: [
      StarterKit
    ],
  }, []);

  useEffect(() => {
    if (!editor) { return }

    if (!content) { return }

    if (firstSetContent) { return }

    editor.commands.setContent(content)
    setFirstContent(true)
  }, [content, editor])

  return (<><EditorContent editor={editor} name={name} /></>);
}

export default CustomEditor;
