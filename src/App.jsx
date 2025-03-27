import { useState, useEffect } from "react";
import "./App.css";
import NewsList from "./components/NewsList/NewsList";
import NewsForm from "./components/NewsForm/NewsForm";

const App = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedNews = localStorage.getItem("news");
    if (savedNews) {
      try {
        const parsedNews = JSON.parse(savedNews);
        if (Array.isArray(parsedNews)) {
          setNews(parsedNews);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("news", JSON.stringify(news));
  }, [news]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    if (editingId) {
      setNews(
        news.map((item) =>
          item.id === editingId ? { ...item, title, content } : item
        )
      );
      setEditingId(null);
    } else {
      const newNews = {
        id: Date.now(),
        title,
        content,
      };
      setNews([...news, newNews]);
    }

    setTitle("");
    setContent("");
  };

  const handleDelete = (id) => {
    setNews(news.filter((item) => item.id !== id));
  };

  const handleEdit = (newsItem) => {
    if (!newsItem) return;
    setTitle(newsItem.title || "");
    setContent(newsItem.content || "");
    setEditingId(newsItem.id);
  };

  return (
    <div className="news-app">
      <h1>Новостная лента</h1>
      <NewsForm
        title={title}
        content={content}
        editingId={editingId}
        onTitleChange={(e) => setTitle(e.target.value)}
        onContentChange={(e) => setContent(e.target.value)}
        onSubmit={handleSubmit}
      />
      <NewsList news={news} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
