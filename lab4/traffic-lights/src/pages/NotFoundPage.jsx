import { Link } from "react-router";

function NotFoundPage() {
  return (
    <>
      <p className="not-found-code">404</p>
      <h1>Сторінку не знайдено</h1>
      <p className="page-copy">
        Перевірте адресу або поверніться на{" "}
        <Link to="/">головну сторінку</Link>.
      </p>
    </>
  );
}

export default NotFoundPage;
