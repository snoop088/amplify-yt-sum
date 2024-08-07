"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { SignOut } from "@/components/signout";

Amplify.configure(outputs);

export default function AmplifyProvider({ children }: React.PropsWithChildren) {
  return (
    <Authenticator>
      <Authenticator.Provider>
        <header>
          <h2>Say what?!</h2>
        </header>
        <main>{children}</main>
        <footer>
          <SignOut />
        </footer>
      </Authenticator.Provider>
    </Authenticator>
  );
}
