"use client";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import styles from "./news.module.css";
import { useState, useEffect } from "react";
export const News = () => {
  const client = generateClient<Schema>();

  const listNews = () => {
    client.models.News.observeQuery().subscribe({
      next: (data) => {
        setNews([...data.items]);
      },
    });
  };
  const [news, setNews] = useState<Array<Schema["News"]["type"]>>([]);
  useEffect(() => {
    listNews();
  }, []);
  return (
    <div className={styles.container}>
      {news.map((n) => (
        <article key={n.id}>
          <h5>{n.title}</h5>
          <i>
            Author: {n.author} Created: {n.createdAt}
          </i>
          <p>{n.content}</p>
          <button onClick={async (e) => {
            const r = await client.queries.invokeApi({name: 'whaat'});
            console.log(r)
          }}>check me</button>
        </article>
      ))}
    </div>
  );
};
