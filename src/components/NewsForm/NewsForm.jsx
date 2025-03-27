import "./NewsForm.css";

const NewsForm = ({
  title,
  content,
  editingId,
  onTitleChange,
  onContentChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="news-form">
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={onTitleChange}
        required
      />
      <textarea
        placeholder="Текст новости"
        value={content}
        onChange={onContentChange}
        required
      />
      <button type="submit">{editingId ? "Обновить" : "Добавить"}</button>
    </form>
  );
};

export default NewsForm;
