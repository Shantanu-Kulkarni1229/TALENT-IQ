
import './App.css'
import { SignedIn, SignOutButton, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function App() {

  return (
    <>
      <h1>
        Welcome to Our App
      </h1>
      <SignedOut>
        <SignInButton mode="modal" >
          <button>SignUp Please</button>
          </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <SignedIn>
        <UserButton />
      </SignedIn>

    </>
  );
}

export default App
