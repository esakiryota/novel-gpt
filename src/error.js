import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <p>サーバー内でエラーが起きています。</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}