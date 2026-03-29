# Zero Downtime CI/CD Pipeline using Kubernetes

## Project Overview

This project demonstrates a **production-style CI/CD pipeline** with **zero downtime deployments** using Kubernetes.

It implements real-world deployment strategies like:

* 🔵 Blue-Green Deployment
* 🐤 Canary Deployment
* 🔁 Rollback Mechanism

The goal is to simulate how modern systems deploy applications **without affecting users**.

---

## Project Architecture

```
Developer → GitHub → CI Pipeline → Docker → Kubernetes → Users
```

---

## Tech Stack

* CI/CD: GitHub Actions
* Containerization: Docker
* Orchestration: Kubernetes (Minikube)
* Language: Node.js (Express)
* Infrastructure (Optional): Terraform

---

## Application Features

* `/` → Returns app version (BLUE / GREEN)
* `/health` → Health check endpoint
* `/fail` → Simulates failure (for rollback testing)

---

## Docker Setup

### Build Image

```
docker build -t devops-app:v1 .
```

### Run Container

```
docker run -p 3000:3000 devops-app:v1
```

---

## ☸️ Kubernetes Setup

### Start Cluster

```
minikube start
```

### Create Namespace

```
kubectl create namespace devops
```

### Deploy Application

```
kubectl apply -f k8s/
```

---

## 🔵🟢 Blue-Green Deployment

Blue = Current live version
Green = New version

### Steps:

1. Deploy Green version
2. Test it independently
3. Switch traffic via service update

### Switch Traffic

```
kubectl patch service app-service \
-p '{"spec":{"selector":{"app":"devops","version":"green"}}}' \
-n devops
```

---

## 🐤 Canary Deployment

* Gradually shift traffic using replicas

### Example:

* Blue: 4 replicas
* Green: 1 replica

Traffic split ≈ 80% / 20%

---

## 🔁 Rollback Strategy

If deployment fails:

```
kubectl rollout undo deployment/app-green -n devops
```

---

## CI/CD Pipeline

### Trigger:

* On every push to `main`

### Steps:

1. Checkout code
2. Install dependencies
3. Build Docker image
4. Push to Docker registry

---

##  Important Note

GitHub Actions **cannot directly access local Minikube**.

So:

* CI is automated via GitHub Actions
* CD (deployment) is performed locally

### Production Recommendation:

Use:

* AWS EKS
* GKE
* AKS

---

## How to Run the Project

### 1. Clone Repository

```
git clone <your-repo-url>
cd devops-zero-downtime
```

### 2. Start Kubernetes

```
minikube start
```

### 3. Build Docker Image (Minikube)

```
eval $(minikube docker-env)
docker build -t devops-app:v1 .
```

### 4. Deploy

```
kubectl apply -f k8s/
```

### 5. Access App

```
minikube service app-service -n devops
```

---

## Key Learnings

* CI/CD pipeline design
* Kubernetes deployments
* Blue-Green strategy
* Canary releases
* Debugging ImagePullBackOff issues
* Handling real-world limitations (local vs cloud)

---

## Future Improvements

* Deploy on AWS EKS
* Add Prometheus + Grafana monitoring
* AI-based deployment decision making
* Istio for advanced traffic control
* GitOps using ArgoCD

---

## Designed && Execution ~ Saksham Sharma

