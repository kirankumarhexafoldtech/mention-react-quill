import { useRef, useState } from "react";
import "./App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Quill = ReactQuill.Quill;
function App() {
  const [value, setValue] = useState("");
  const quillRef = useRef(null);
  const [cursor, setCursor] = useState(0);
  const [cursorActive, setCursorActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleSetValue = (content, delta, source, editor) => {
    const cursorPosition = editor.getSelection()?.index || 0;

 
    if (content.includes(" @")) {
      setValue(content);
      setCursor(cursorPosition);
      const { top, left } = editor.getBounds(cursorPosition);
      setPopupPosition({ top: top + 50, left });
      setShowPopup(true);
      setTimeout(() => {
        const quill = quillRef.current.getEditor();
        quill.setSelection(cursorPosition + 2);
      }, 0);
      // const index = content.indexOf(" @");
      // const textBefore = content.slice(0, index + 1);
      // const textAfter = content.slice(index + 2);

      // const mentionHTML = ` <a href="https://google.com" target="__blank">kiran kumar</a>`;

      // const newContent = `${textBefore}${mentionHTML}${textAfter}`;
      // setValue(newContent);

      // setTimeout(() => {
      //   const quill = quillRef.current.getEditor();
      //   quill.setSelection(cursorPosition + 10);
      // }, 0);
    } else {
      setValue(content);
    }
  };

  const handleSelectOption = (option) => {
    setShowPopup(false);

    const index = value.indexOf(" @");
  
    const textBefore = value.slice(0, index + 1);
    const textAfter = value.slice(index + 2);

    const mentionHTML = ` <a href="https://google.com" target="__blank">${option}</a>`;
    const newContent = `${textBefore}${mentionHTML}${textAfter}`;
    setValue(newContent);

    setTimeout(() => {
      const quill = quillRef.current.getEditor();
      quill.setSelection(cursor + option.length);
    }, 0);

    // const quillEditor = document.querySelector('.ql-editor');
    // const cursorPosition = quillEditor.selectionStart;
    // const textBeforeCursor = editorValue.slice(0, cursorPosition - 1);
    // const textAfterCursor = editorValue.slice(cursorPosition);

    // const newValue = `${textBeforeCursor}${option}${textAfterCursor}`;
    // setEditorValue(newValue);
  };

  const handleSetCursor = (value) => {
    if (cursorActive) {
      setCursor(value);
    }
  };

  return (
    <>
      <div className="main">
        <div className="editor">
          <ReactQuill
            theme="snow"
            ref={quillRef}
            value={value}
            onChange={handleSetValue}
          />
          {showPopup && (
            <div
              style={{
                position: "absolute",
                top: popupPosition.top,
                left: popupPosition.left,
                zIndex: 10,
              }}
            >
              <div className="popup-box">
                <p>Select an option</p>
                <button onClick={() => handleSelectOption("John Doe")}>
                  John Doe
                </button>
                <button onClick={() => handleSelectOption("Jane Doe")}>
                  Jane Doe
                </button>
                {/* Add more options as needed */}
              </div>
            </div>
          )}
        </div>
        {value ? (
          <div className="html" dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
