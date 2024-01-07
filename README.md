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

## Page animation:

- Start by creating an AnimationWrapper component and pass children as props
- This means that child elements inside of the AnimationWrapper component (as it won't be a self closing element) will be affected by whatever functions that we use in the AnimationWrapper component file.

- In this case, we're using it for the userAuthForm and so should wrap the form like so (The form is the child element here):

```
<AnimationWrapper>
<form></form>
</AnimationWrapper>
```

### Framer-Motion:

- Import the following:

```
import { AnimatePresence, motion } from "framer-motion";
```

- Then we convert the AnimationWrapper div into a motion div by pre-pending it to the element tag:
- Wrap it in AnimatePresence in order to keep track of the animation process:

```
<AnimatePresence>
<motion.div>
{ childen }
</motion.div>
</AnimatePresence>
```

- For the animation itself, we can pass them through as properties and attributes (Remember to pass any props in the function params):

```
<motion.div
  initial={initial}
  animate={animate}
  transition={transition}>

```

- Initial = Initial value/state
- We can pass a default value through the props if we don't want to keep declaring one each time:

```
const AnimationWrapper = ({ initial = { opacity: 0 } })
```

- Animate - Represents the final state of this component once the animation sequence has run
- This can also have a default value:

```
const AnimationWrapper = ({ animate = { opacity: 1 } })
```

- Transition - Represents the behaviour of the animation, ie: the speed:
- Can also be passed with a default value:

```
const AnimationWrapper = ({ transition = { duration: 1.2 } })
```

- Remember, we need to pass a key prop so that framer-motion can tell when the form has changed to another one, otherwise the animation will only work on initial page load.

```
key={keyValue}
```

- This must be passed as a prop and then referenced in the parent component (The AnimationWrapper in the userauthform component):
- We reference the type here as it switches between /sign-in and /sign-up

```
<AnimationWrapper keyValue={type}>
```

- The 'type' is coming from the Route props in App.jsx:

```
 <Route path="signin" element={<UserAuthForm type="sign-in" />} />
```
