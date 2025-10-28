import React, { useState, useEffect } from "react";
import CodePreview from "./components/CodePreview";
import { nanoid } from "nanoid";
import Editor from "@monaco-editor/react";

function App() {
  const PROJECT_ID = "user123";
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [autosave, setAutosave] = useState(true);
  const [flexDir, setFlexDir] = useState(window.innerWidth < 768 ? "column" : "row");

  const loadProject = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/projects/load/${PROJECT_ID}`);
      const data = await res.json();
      if (data.success) {
        setFiles(data.files);
      } else {
        setFiles({
          "/App.jsx": { code: `export default function App() { return <h1>Hello CipherStudio!</h1>; }`, active: true },
        });
      }
    } catch (err) {
      console.error(err);
      setFiles({
        "/App.jsx": { code: `export default function App() { return <h1>Hello CipherStudio!</h1>; }`, active: true },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
    const handleResize = () => setFlexDir(window.innerWidth < 768 ? "column" : "row");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const saveProject = async (newFiles) => {
    setFiles(newFiles);
    if (!autosave) return;
    try {
      await fetch("http://localhost:5000/api/projects/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: PROJECT_ID, files: newFiles }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const addFile = () => {
    const fileName = `/File${nanoid().slice(0, 4)}.jsx`;
    const newFiles = { ...files, [fileName]: { code: "// new file", active: true } };
    saveProject(newFiles);
  };

  const deleteFile = (fileName) => {
    const newFiles = { ...files };
    delete newFiles[fileName];
    saveProject(newFiles);
  };

  const activeFile = Object.keys(files).find((f) => files[f].active);
  const updateCode = (newCode) => {
    if (!activeFile) return;
    const newFiles = { ...files, [activeFile]: { ...files[activeFile], code: newCode, active: true } };
    saveProject(newFiles);
  };

  const setActiveFile = (fileName) => {
    const newFiles = {};
    Object.keys(files).forEach((f) => {
      newFiles[f] = { ...files[f], active: f === fileName };
    });
    setFiles(newFiles);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "vs-dark" : "light");
  const toggleAutosave = () => setAutosave(!autosave);

  if (loading) return <div>Loading project...</div>;

  return (
    <div style={{ display: "flex", flexDirection: flexDir, height: "100vh" }}>
      <div style={{ flex: 1, borderRight: "1px solid gray", padding: "10px" }}>
        <h3>Files</h3>
        <div style={{ marginBottom: "10px" }}>
          <button onClick={addFile}>+ New File</button>
          <button onClick={toggleTheme} style={{ marginLeft: "10px" }}>
            Theme: {theme === "light" ? "Light" : "Dark"}
          </button>
          <button onClick={toggleAutosave} style={{ marginLeft: "10px" }}>
            Autosave: {autosave ? "On" : "Off"}
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Object.keys(files).map((file) => (
            <li key={file} style={{ marginBottom: "5px", cursor: "pointer" }}>
              <span
                style={{ fontWeight: files[file].active ? "bold" : "normal" }}
                onClick={() => setActiveFile(file)}
              >
                {file}
              </span>{" "}
              <button onClick={() => deleteFile(file)} style={{ marginLeft: "5px" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <Editor
            height="50vh"
            language="javascript"
            theme={theme}
            value={files[activeFile]?.code || ""}
            onChange={updateCode}
          />
        </div>
        <div style={{ flex: 1 }}>
          <CodePreview files={files} />
        </div>
      </div>
    </div>
  );
}

export default App;
