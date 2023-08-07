import { Icon } from "@iconify/react/dist/iconify.js";

const LoginPage = () => {
  return (
    // User login form
    // Form with username/email, password
    <div className="">
      {/* Intro + tagline */}
      <div className="min-h-screen py-8 text-center flex flex-col justify-center items-center">
        {/* Form card */}
        <div className="text-white bg-blue-700 dark:bg-white dark:text-black p-4 rounded-lg w-2/3 md:w-1/3">
          <h2 className="text-3xl hover:text-blue-300 dark:text-blue-700 flex items-center justify-center gap-4 text-center">
            <Icon icon="ic:round-login" className="text-4xl" />
            Login
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target);
            }}
            className="mt-5 py-6 flex flex-col items-center gap-4"
          >
            <input
              className="p-2 rounded-lg w-full border-2 border-blue-300 hover:border-blue-800"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="p-2 rounded-lg w-full border-2 border-blue-300 hover:border-blue-800"
              type="password"
              name="password"
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-1/3 bg-blue-500 hover:bg-blue-400 rounded-lg p-2 text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
