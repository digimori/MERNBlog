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

## State Notes:

- To toggle the search bar visible and invisible:

```
// The state, the initial value as false means it will start out as hidden:
const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

// In the original searchbar div, encapsulate the classnames in {} and add a ternary to toggle classes to show and hide the search bar:
// Remember to add a space at the end of the class names, otherwise it will concatenate like "hereshow" or "herehide"
className={"class names here " + (searchBoxVisibility ? "show" : "hide")}

// Button will have the following: This will toggle the false to true and vice-versa using setSearchBoxVisibility
onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
```

## Routes and Forms:

Set up the Route for the Navbar as follows in App.jsx:
You must pass in a path prop and an element prop
By nesting the Route self-closing elements inside of a open-close Route tag (The one containing the Navbar component), you can render the routes whilst keeping the Navbar as the parent
This also requires the Outlet import (In the navbar component file) from the react-router-dom package in order to access the rendered elements that are nested.

```
<Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<h1>Sign in page</h1>} />
        <Route path="signup" element={<h1>Sign up page</h1>} />
      </Route>
    </Routes>
```

### Outlet:

- Outlet must go outside of the navbar as its own self-closing tag (Still within the navbar component):
- Remember these must be either fragmented (<></>) or nested in an outer container

```
<Outlet />
```
