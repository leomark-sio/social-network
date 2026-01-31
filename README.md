# Social Network

A full-stack social network application with a Node.js/Express REST API backend and Next.js frontend.

## Repository

**GitHub:** [https://github.com/leomark-sio/SocialNetwork](https://github.com/leomark-sio/SocialNetwork)

## Contact

- **Email:** [leomarksio386@gmail.com](mailto:leomarksio386@gmail.com)
- **GitHub:** [https://github.com/leomark-sio](https://github.com/leomark-sio)

---

## Project Structure

```
SocialNetwork/
├── old-backend/     # Express.js REST API (Node.js + MongoDB)
└── social/         # Next.js frontend
```

## Features

- **Authentication:** Sign up, sign in with JWT
- **Posts:** Create, read, like, comment, delete
- **Users:** Follow/unfollow, view user profiles
- **RESTful API:** Clean API design with proper error handling

---

## Backend Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
cd old-backend
yarn install
```

### Configuration

1. Copy `.env.example` to `.env`
2. Set your environment variables:

```env
MONGOURI=mongodb://localhost:27017/socialnetwork
JWT_SECRET=your-secure-jwt-secret
PORT=3000
```

### Run

```bash
yarn dev    # Development (with nodemon)
yarn start  # Production
```

API runs at `http://localhost:3000`

---

## Frontend Setup

### Installation

```bash
cd social
yarn install
```

### Run

```bash
yarn dev    # Development
yarn build  # Production build
yarn start  # Production
```

App runs at `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/signin` | Login |
| POST | `/createpost` | Create post (auth required) |
| GET | `/allposts` | Get all posts (auth required) |
| GET | `/myposts` | Get current user's posts (auth required) |
| PUT | `/like` | Like a post (auth required) |
| PUT | `/unlike` | Unlike a post (auth required) |
| PUT | `/comment` | Add comment (auth required) |
| DELETE | `/delete/:postId` | Delete post (auth required) |
| GET | `/user/:id` | Get user profile |
| PUT | `/follow` | Follow user (auth required) |
| PUT | `/unfollow` | Unfollow user (auth required) |

---

## Tech Stack

**Backend:** Express.js, MongoDB, Mongoose, JWT, bcryptjs  
**Frontend:** Next.js, React, Tailwind CSS

---

## License

ISC
