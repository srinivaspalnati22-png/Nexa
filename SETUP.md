# NEXUS AI 2.0 — Setup & Deployment Guide

## Prerequisites
- **Node.js**: v18.0.0 or higher (v24 tested)
- **Python**: 3.10 or higher (Python 3.14 tested)
- **npm** or **yarn**

---

## 1. Quick Setup (Frontend)

1. Clone or navigate to the project directory:
   ```bash
   cd NEXUSAI
   ```

2. Dependencies are already installed (`npm install`). To verify:
   ```bash
   npm list --depth=0
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 2. Python Backend Setup (Optional companion server)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python requirements:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

---

## 3. Environment Variables

Create or inspect `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD48ln2VLOy-JHyiXiPxY__XytVsTQCdEY
NEXT_PUBLIC_FIREBASE_PROJECT_ID=nexusai-3d6b4
```

> [!NOTE]
> The application includes a self-contained offline and local state engine, meaning all features, maps, AI commander actions, and simulations function immediately even if the backend is not running.
