/**
 * Gets the path for the server to make requests to
 * In development it will be the localhost where as in production
 * it will be the heroku app.
 */
export default function withBaseURL(_path) {
  const baseURI =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : `https://bresee-internskip.herokuapp.com/`;
  const path = baseURI + _path.replace(/^\/+/, "");
  return path;
}
