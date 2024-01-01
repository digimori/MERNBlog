# MERN Stack Blog Editor

## Technologies used:

- React.js w/Vite
- Node.js
- MongoDB w/Mongoose
- TailwindCSS
- JSON Web Token
- Axios
- Framer Motion
- Firebase Admin

## Setup:

- Clone Repo and install dependencies via npm install
- Ensure that you install both the client side and server side
- Make sure that the package.json has modules enabled:

```
 "type": "module"
```

### React Router:

- Wrap the <App /> component in <BrowserRouter> tags within the main.jsx file:
- Remember to import this if it doesn't do it automatically

```
import { BrowserRouter } from 'react-router-dom'

  <React.StrictMode>
  <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
```

Without this, you will not be able to use <Link> tags for routing!
