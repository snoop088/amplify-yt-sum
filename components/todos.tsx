"use client";
import { AuthUser } from "aws-amplify/auth";
import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";

export interface TodosProps {
  user: AuthUser;
}

export const Todos = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const client = generateClient<Schema>();

  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    if (user) listTodos();
  }, [user]);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.content}
            <button onClick={() => deleteTodo(todo.id)}>del</button>
          </li>
        ))}
      </ul>

      <div>🥳 App successfully hosted. Try creating a new todo.</div>
    </main>
  );
};
