# 🔐 Login Flow (Redux Toolkit + Next.js)

This project implements a simple authentication flow using **Redux Toolkit** with **Next.js App Router**.

---

## Flow Overview

```text
Login Page
 → User enters email & password
 → Dispatch loginUser async thunk
 → API request is sent
 → Redux updates auth state
 → UI reacts to state changes
 → User is redirected to dashboard
```

---

## How It Works

- The login form collects user credentials
- On submit, a Redux async thunk (`loginUser`) is dispatched
- Redux sets `loading = true` while the API request is in progress
- The authentication API validates the credentials
- On success:
  - User and token are stored in Redux state
  - Loading stops
  - User is redirected to `/dashboard`
- On failure:
  - An error message is stored in Redux state
  - Loading stops
  - UI displays the error

---

## State Managed by Redux

The auth slice manages the following state:

- `loading` – indicates login request status
- `user` – authenticated user data
- `token` – JWT token returned from API
- `error` – login failure message

---

## Project Structure (High Level)

```text
app/            → Pages and routing (Next.js App Router)
services/       → API calls (auth)
store/          → Redux setup and auth slice
```

---

## Result

After a successful login, the user is authenticated in Redux and automatically navigated to the dashboard.
