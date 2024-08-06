"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

import { Authenticator, Button } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";
import "./app.css";
import { Todos } from "@/components/todos";

Amplify.configure(outputs);

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

  return (
    <Authenticator>
      {({ signOut, user }) =>
        user ? (
          <div>
            <div>
              <Todos user={user} />
            </div>
            <div>
              <button onClick={signOut}>Sign Out</button>
            </div>
          </div>
        ) : (
          <></>
        )
      }
    </Authenticator>
  );
}
