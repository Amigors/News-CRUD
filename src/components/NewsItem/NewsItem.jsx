import "./NewsItem.css";

const NewsItem = ({ item, onEdit, onDelete }) => {
  return (
    <div className="news-item">
      <h3>{item.title || "Без названия"}</h3>
      <p>{item.content || "Нет содержимого"}</p>
      <div className="news-actions">
        <button onClick={() => onEdit(item)}>✏️</button>
        <button onClick={() => onDelete(item.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default NewsItem;
