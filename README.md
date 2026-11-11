# BookHub 📚

A full-stack book discovery and management platform built with React, TypeScript and Django.

BookHub aims to provide readers with a place to discover books, explore different categories, and keep track of the books they love.

## Features

- **Book Discovery:** Explore and discover books.
- **Home Page:** Browse recommended books and categories.
- **Authentication:** User registration and login.
- **Session Management:** Django session-based authentication.
- **User Profiles:** Custom user profiles with display names, biographies and profile pictures.
- **Book Data:** Integration with the Open Library API.

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Axios

### Backend
- Python
- Django
- Django REST Framework
- PostgreSQL

### External API
- Open Library API

## Project Structure

```text
BookHub/
├── backend/
│   ├── books/
│   ├── core/
│   ├── users/
│   └── config/
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── services/
    ├── package.json
    └── vite.config.ts
```

## Getting Started

### Prerequisites

- Python
- Node.js and npm
- PostgreSQL

### Backend Setup

```bash
cd backend

python -m venv .venv
```

Activate the virtual environment and install the backend dependencies:

```bash
pip install -r requirements.txt
```

Configure your database and environment variables, then run:

```bash
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

Open another terminal:

```bash
cd frontend

npm install
npm run dev
```

The frontend development server will run at:

```text
http://localhost:5173
```

The Django development server will run at:

```text
http://localhost:8000
```

## Authentication

BookHub uses Django's session-based authentication through Django REST Framework.

Authentication endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/auth/me/` | Retrieve current user |
| POST | `/api/auth/login/` | Authenticate user |
| POST | `/api/auth/logout/` | End user session |
| POST | `/api/auth/register/` | Register a new user |

Session cookies and CSRF protection are used for authentication.

## External API

BookHub integrates with the [Open Library API](https://openlibrary.org/developers/api) to retrieve book information.

## License

This project is currently under development.
