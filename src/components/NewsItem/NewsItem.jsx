import { useState } from "react";
import "./NewsItem.css";

const NewsItem = ({ item, onEdit, onDelete }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = (answer) => {
    if (answer === "yes") {
      onDelete(item.id);
    }
    setIsConfirmOpen(false);
  };

  return (
    <div className="news-item">
      <h3>{item.title || "Без названия"}</h3>
      <p>{item.content || "Нет содержимого"}</p>
      <div className="news-actions">
        <button onClick={() => onEdit(item)}>✏️</button>
        <button onClick={handleDeleteClick}>🗑️</button>
      </div>

      {isConfirmOpen && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <p>Вы уверены, что хотите удалить эту новость?</p>
            <div className="confirm-modal-buttons">
              <button onClick={() => handleConfirmDelete("yes")}>Да</button>
              <button onClick={() => handleConfirmDelete("no")}>Нет</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsItem;
