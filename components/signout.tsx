"use client";
import { useAuthenticator } from "@aws-amplify/ui-react";
import React from "react";

export const SignOut = () => {
  const { signOut } = useAuthenticator((context) => [context.user]);
  return <button onClick={signOut}>Sign Out</button>;
};
