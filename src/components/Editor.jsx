import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill-mention/dist/quill.mention.css';
import { Mention, MentionBlot } from 'quill-mention';

const QuillEditor = () => {
  const quillRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    if (quillRef.current && !editorInstance.current) {
      Quill.register({ 'blots/mention': MentionBlot, 'modules/mention': Mention });

      editorInstance.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          mention: {
            allowedChars: /^[A-Za-z\s]*$/,
            mentionDenotationChars: ['@'],
            source: function (searchTerm, renderList) {
              const values = [
                { id: 1, value: 'Kiran' },
                { id: 2, value: 'John Doe' },
                { id: 3, value: 'Jane Smith' },
              ];

              if (searchTerm.length === 0) {
                renderList(values, searchTerm);
              } else {
                const matches = values.filter(item =>
                  item.value.toLowerCase().includes(searchTerm.toLowerCase())
                );
                renderList(matches, searchTerm);
              }
            },
          },
        },
      });
    }
  }, []);

  return <div ref={quillRef} />;
};

export default QuillEditor;
