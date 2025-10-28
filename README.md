# CipherStudio

CipherStudio is a browser-based React IDE that lets you create, edit, and preview React projects directly in your browser. You can manage multiple files, write React code, see live updates, and save or reload your projects to continue later.

## Features

**Core Features:**
- Create, delete, and manage multiple project files.
- Write React code using **Monaco Editor**.
- Live preview of your project as you code.
- Save and reload projects using a `projectId`.

**Extra Features:**
- Dark/Light theme switcher.
- Autosave option.
- Responsive design for desktop and tablet screens.

## Tech Stack

- **Frontend:** React, Monaco Editor  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Deployment (optional):** Vercel (frontend), Render/Railway (backend)

## Project Structure

cipherStudio/
├─ backend/
│ ├─ models/Project.js
│ ├─ routes/projectRoutes.js
│ ├─ server.js
│ └─ testRoutes.js
├─ frontend/
│ ├─ src/
│ │ ├─ App.jsx
│ │ └─ components/CodePreview.jsx
│ └─ package.json
└─ .gitignore




## How to Run

**Backend:**
1. Go to `backend` folder  
2. Install dependencies: `npm install`  
3. Create a `.env` file with your MongoDB URI and `PORT`  
4. Start the server: `npx nodemon server.js`  

**Frontend:**
1. Go to `frontend` folder  
2. Install dependencies: `npm install`  
3. Start the frontend: `npm run dev`  
4. Open the browser at the provided URL (usually `http://localhost:5173`)  

## API Endpoints

- **Load Project:** `GET /api/projects/load/:projectId`  
- **Save Project:** `POST /api/projects/save` with JSON `{ projectId, files }`  

## Notes

- Focused on core features: file management, live preview, and saving/loading projects.  
- Simple, clean, and easy-to-use interface.  
- Uses Monaco Editor for coding and live preview functionality.

## GitHub Repository

[https://github.com/Rahulbishnoiz29/cipherStudioAssignment](https://github.com/Rahulbishnoiz29/cipherStudioAssignment)
