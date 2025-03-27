import NewsItem from "../NewsItem/NewsItem";
import "./NewsList.css";

const NewsList = ({ news, onEdit, onDelete }) => {
  return (
    <div className="news-list">
      {news.length === 0 ? (
        <p>Новостей пока нет</p>
      ) : (
        news.map((item) => (
          <NewsItem
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default NewsList;
