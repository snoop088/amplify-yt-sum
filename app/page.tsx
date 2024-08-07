"use client";
import { useAuthenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";
import "./app.css";
import { Todos } from "@/components/todos";


export default function App() {
  const components = {
    SignUp: {
      // hide the form fields and buttons

      FormFields: () => null,

      Footer: () => (
        <p className="disableSignup">
          Sign-ups are currently disabled. Please contact an administrator.
        </p>
      ),
    },
  };
  const { user, signOut } = useAuthenticator((context) => [
    context.user,
  ]);
  return (
    <div>
      <div>
        <Todos user={user} />
      </div>
      <div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}
