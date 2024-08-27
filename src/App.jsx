import "./App.css";
import "quill/dist/quill.snow.css";
import QuillEditor from "./components/Editor";

function App() {
 
  return (
      <div className="main">
        <div className="editor">
         <QuillEditor/>
        </div>
      </div>
  );
}

export default App;
