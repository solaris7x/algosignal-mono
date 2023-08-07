import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <main className="min-h-[50vh] text-center py-6">
      <h1 className="text-5xl font-semibold flex items-center justify-center gap-2">
        404
      </h1>
      <div className="py-2">There's nothing here!</div>
      <Link to="/" className="text-blue-500">
        Back Home
      </Link>
    </main>
  );
};
export default Page404;
