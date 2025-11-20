# 🚀 **Industrix Todo App – Fullstack (Backend + Frontend)**

Simple todo management system with categories, filters, pagination, and CRUD operations.

---

# 📌 **Backend (Node.js + Express + Sequelize + PostgreSQL)**

## **1. Setup**

```bash
cd backend
npm install
```

## **2. Environment (.env)**

```
PORT=4000
```

## **3. Migrate + Seed**

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## **4. Run Server**

```bash
npm run dev
```

## **5. Features**

* CRUD Todo
* CRUD Category
* Pagination (`page`, `limit`)
* Search (`?search=...`)
* Status filter (`completed|incomplete`)
* Category filter (`?category=ID`)
* Priority filter (`?priority=low|medium|high`)
* Includes category relation in response

## **6. API Endpoints**

### **Todos**

| Method | Endpoint       | Description                 |
| ------ | -------------- | --------------------------- |
| GET    | /api/todos     | List + filters + pagination |
| POST   | /api/todos     | Create todo                 |
| PUT    | /api/todos/:id | Update todo                 |
| DELETE | /api/todos/:id | Delete todo                 |

### **Categories**

| Method | Endpoint            | Description     |
| ------ | ------------------- | --------------- |
| GET    | /api/categories     | List categories |
| POST   | /api/categories     | Create          |
| PUT    | /api/categories/:id | Update          |
| DELETE | /api/categories/:id | Delete          |

---

# 🎨 **Frontend (React + TypeScript + AntD + Axios + Context API)**

## **1. Setup**

```bash
cd frontend
npm install
npm run dev
```

## **2. Tech Stack**

* React + TSX
* Ant Design UI
* Axios (API client)
* Context API (todos + filters + pagination global state)
* Reusable components (Modal, Table, Filters)

## **3. Features**

✔ Fetch todos w/ pagination
✔ Search, status filter, category filter
✔ CRUD modal
✔ Update + delete from table
✔ Auto refresh after action
✔ Day.js for handling dates
✔ Reusable UI components

## **4. Folder Structure**

```
src/
 ├── api/api.ts
 ├── context/TodoContext.tsx
 ├── components/
 │     ├── TodoTable.tsx
 │     ├── TodoFilters.tsx
 │     └── TodoModal.tsx
 └── pages/Dashboard.tsx
```

## **5. Run**

```bash
npm run dev
```

Frontend berjalan pada `http://localhost:5173`
Backend pada `http://localhost:4000`

---

# ✔️ **Result**

Project memenuhi semua requirement:

* Pagination
* Search
* Filters
* CRUD Todo
* CRUD Category
* Category relation
* Reusable components
* Clean structure
* Context API

