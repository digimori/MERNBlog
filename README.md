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

## User Auth:

- Start with a UserAuthForm functional component
- Pass the prop of {type}
- Import this component to App.jsx
- Render the component inside the Routes for sign-in and sign-up - remember to pass the type props here!

### The form:

```
<form action="POST">
// Conditional render for h1 depending on if Sign-in or signup page:
        <h1>
          {type == "sign-in" ? "Welcome Back!" : "Sign Up?"}
        </h1>

// If the type prop passed in is NOT sign-in, Show the username input, else, don't.
        {type != "sign-in" ? (
          <InputBox
            name="username"
            type="text"
            placeholder="Username"
            icon="fi-rr-user"
          />
        ) : (
          ""
        )}

        <InputBox
          name="email"
          type="email"
          placeholder="Email"
          icon="fi-rr-at"
        />
        <InputBox
          name="password"
          type="password"
          placeholder="Password"
          icon="fi-rr-key"
        />
        <button type="submit">
          {type.replace("-", " ")}
        </button>

        <div>
          <hr className="w-[50%] border-black" />
          <p>or</p>
          <hr className="w-[50%] border-black" />
        </div>

        <button>
          <img src={googleIcon} className="w-5" alt="google-icon" />
          Continue with Google
        </button>

// Conditional to choose which text to render for the forms:
        {type == "sign-in" ? (
          <p className="mt-6 text-dark-grey text-xl text-center">
            Don't have an account?
            <Link to="/signup" className="underline text-black text-xl ml-1">
              Create One!
            </Link>
          </p>
        ) : (
          <p className="mt-6 text-dark-grey text-xl text-center">
            Already Registered?
            <Link to="/signin" className="underline text-black text-xl ml-1">
              Sign In Here
            </Link>
          </p>
        )}
      </form>
```

### Dynamic icons:

- We can append different icons by their name via props.
- "icon" is appended to the classname and then passed through as props to correspond with the different icons you may use within the components in the same way that you would change text between a re-usable button component

```
What would usually be:
<i className="fi fi-rr-user"></i>

is now, retaining the flaticon class but changing the identifier for different icons:
<i className={"fi " + icon}></i>
```

- This can then be passed through the component like so:

```
<InputBox name="username" type="text" placeholder="Username" icon="fi-rr-user" />

```
