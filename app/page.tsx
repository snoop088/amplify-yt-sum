"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

import { Authenticator, Button } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";
import "./app.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }
  const components = {
    SignUp: {
      // hide the form fields and buttons
      
      FormFields: () => null,

      Footer: () => (
        <p className="disableSignup">Sign-ups are currently disabled. Please contact an administrator.</p>
      ),
    },
  };
  
  return (
    <Authenticator
      components={components}
    >
      {({ signOut, user }) => (
        <main>
          <h1>My todos</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.content}
                <button onClick={() => deleteTodo(todo.id)}>del</button>
              </li>
            ))}
          </ul>
          <button onClick={signOut}>Sign Out</button>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
              Review next steps of this tutorial.
            </a>
          </div>
        </main>
      )}
    </Authenticator>
  );
}
