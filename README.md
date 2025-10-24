# 💬 Full Stack Real-Time Chat App (Kubernetes + Docker + Minikube)

[![Fork Button](https://img.shields.io/github/forks/imrannadaf/full-stack_chatApp?style=social)](https://github.com/imrannadaf/full-stack_chatApp/fork)

A fully containerized, real-time chat application powered by **Node.js**, **React**, **MongoDB**, **Socket.io**, and deployed with **Kubernetes (Minikube)**.

---

## 🧩 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Accessing the Application](#accessing-the-application)
- [Troubleshooting](#troubleshooting)
- [Future Plans](#future-plans)
- [License](#license)

---

## 🚀 Overview

This project is a **real-time chat app** with user authentication, socket-based messaging, and a modern frontend interface.  
The stack is fully containerized and orchestrated using **Kubernetes** (via Minikube).

---

## ✨ Features

- 🔐 **JWT Authentication**
- 💬 **Real-time Messaging** using Socket.io
- 👤 **User Profile Management**
- 🌐 **Frontend-Backend Integration via Kubernetes Services**
- 📦 **Dockerized Microservices**
- 🧠 **State Management** with Zustand
- 🎨 **Modern UI** using React + TailwindCSS + DaisyUI

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React, TailwindCSS, DaisyUI |
| **Backend** | Node.js, Express.js, Socket.io |
| **Database** | MongoDB |
| **Authentication** | JWT |
| **Containerization** | Docker |
| **Orchestration** | Kubernetes (Minikube) |
| **Web Server** | NGINX |

---

## 🏗️ Architecture Overview

```
                        ┌───────────────────────┐
                        │     Frontend Pod      │
                        │  (React + Nginx)      │
                        └─────────┬─────────────┘
                                  │
                            (ClusterIP:80)
                                  │
        ┌──────────────────────────────────────────────┐
        │               Ingress Controller             │
        │        (Optional: via chatapp.local)         │
        └──────────────────────────────────────────────┘
                                  │
                            (ClusterIP:5001)
                                  │
                        ┌───────────────────────┐
                        │     Backend Pod       │
                        │ (Node.js + Express)   │
                        └─────────┬─────────────┘
                                  │
                            (ClusterIP:27017)
                                  │
                        ┌───────────────────────┐
                        │     MongoDB Pod       │
                        └───────────────────────┘
```

---

## 🧰 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/imrannadaf/full-stack_chatApp.git
cd full-stack_chatApp
```

---

### 2️⃣ Build and Push Docker Images

Build your images (replace Docker Hub username if different):

```bash
docker build -t imrannadaf/chatapp-frontend:latest ./frontend
docker build -t imrannadaf/chatapp-backend:latest ./backend
docker push imrannadaf/chatapp-frontend:latest
docker push imrannadaf/chatapp-backend:latest
```

---

### 3️⃣ Deploy MongoDB, Backend, and Frontend to Kubernetes

Apply all Kubernetes manifests from the `/k8s` directory:

```bash
kubectl apply -f k8s/
```

---

### 4️⃣ Check Running Pods and Services

```bash
kubectl get pods -n chat-app
kubectl get svc -n chat-app
```

✅ You should see:
- `frontend` → ClusterIP :80  
- `backend` → ClusterIP :5001  
- `mongodb` → ClusterIP :27017  

---

## 🚪 Accessing the Application (Working Method)

Since Ingress routing can vary across local environments, the **most stable way** to access the app is by **port-forwarding**:

### 🔹 Step 1 — Forward Backend
```bash
kubectl port-forward service/backend -n chat-app 5001:5001
```

### 🔹 Step 2 — Forward Frontend
Open a second terminal:
```bash
kubectl port-forward service/frontend -n chat-app 80:80
```

---

### 🔹 Step 3 — Open the App
Now open your browser and visit:

👉 [http://localhost](http://localhost)

✅ You can now:
- Create a new account  
- Sign in  
- Send and receive messages  

---

## 🩺 Health Check

You can verify your backend health anytime with:

```bash
curl http://localhost:5001/api/health
```

✅ Response example:
```json
{
  "status": "healthy",
  "database": "connected",
  "environment": "production"
}
```

---

## ⚠️ Troubleshooting

| Problem | Cause | Solution |
|----------|--------|-----------|
| `Cannot GET //` | Ingress rewrite rule issue | Use port-forward (stable) |
| Backend CrashLoopBackOff | Missing JWT Secret | Check secret `chatapp-secrets` |
| “Internal Server Error” on signup | MongoDB connection issue | Verify DB connection string |
| Frontend blank page | Ingress routing | Visit via port-forward instead |

---

## 🔮 Future Plans

- [ ] Enable NGINX Ingress fully for external access  
- [ ] Add persistent MongoDB storage (PVC)  
- [ ] Setup CI/CD pipeline (GitHub Actions → Docker Hub → Minikube)  
- [ ] Add Group Chat and File Sharing  
- [ ] Deploy to AWS EKS / GKE  

---

## 📸 UI Snapshots

| Login Page | Chat Window | Settings |
|-------------|-------------|-----------|
| ![Login](frontend/public/login.png) | ![Chat](frontend/public/chat.png) | ![Settings](frontend/public/settings.png) |

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to fork and modify it for learning or production use.

---

### ❤️ Maintained by [Imran Nadaf](https://github.com/imrannadaf)
