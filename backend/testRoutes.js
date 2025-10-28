const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const PROJECT_ID = "user123"; // replace with the same PROJECT_ID as in App.jsx
const BASE_URL = "http://localhost:5000/api/projects";

async function testLoad() {
  try {
    const res = await fetch(`${BASE_URL}/load/${PROJECT_ID}`);
    const data = await res.json();
    console.log("LOAD PROJECT RESPONSE:");
    console.log(data);
  } catch (err) {
    console.error("Error loading project:", err);
  }
}

async function testSave() {
  try {
    const res = await fetch(`${BASE_URL}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: PROJECT_ID,
        files: {
          "/App.jsx": {
            code: "export default function App() { return <h1>Hello CipherStudio Test!</h1>; }",
            active: true,
          },
        },
      }),
    });
    const data = await res.json();
    console.log("SAVE PROJECT RESPONSE:");
    console.log(data);
  } catch (err) {
    console.error("Error saving project:", err);
  }
}

(async () => {
  await testLoad();
  await testSave();
})();
