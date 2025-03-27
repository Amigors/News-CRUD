
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

const App = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedNews = localStorage.getItem('news');
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
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    if (editingId) {
      setNews(news.map(item =>
        item.id === editingId ? { ...item, title, content } : item
      ));
      setEditingId(null);
    } else {
      const newNews = {
        id: Date.now(),
        title,
        content,
      };
      setNews([...news, newNews]);
    }

    setTitle('');
    setContent('');
  };

  const handleDelete = (id) => {
    setNews(news.filter(item => item.id !== id));
  };

  
  const handleEdit = (newsItem) => {
    if (!newsItem) return; 
    setTitle(newsItem.title || ''); 
    setContent(newsItem.content || '');
    setEditingId(newsItem.id);
  };

  return (
    <div className="news-app">
      <h1>Новостная лента</h1>
      
      <form onSubmit={handleSubmit} className="news-form">
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Текст новости"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">
          {editingId ? 'Обновить' : 'Добавить'}
        </button>
      </form>

      <div className="news-list">
        {news.length === 0 ? (
          <p>Новостей пока нет</p>
        ) : (
          news.map((item) => (
            <div key={item.id} className="news-item">
              <h3>{item.title || "Без названия"}</h3>
              <p>{item.content || "Нет содержимого"}</p>
              <div className="news-actions">
                <button onClick={() => handleEdit(item)}>✏️</button>
                <button onClick={() => handleDelete(item.id)}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App
