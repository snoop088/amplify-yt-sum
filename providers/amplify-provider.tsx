"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(outputs);

export default function AmplifyProvider({ children }: React.PropsWithChildren) {
  return (
    <Authenticator>
      <Authenticator.Provider>{children}</Authenticator.Provider>
    </Authenticator>
  );
}
