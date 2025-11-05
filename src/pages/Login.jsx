import React from "react";

const Login = () => {
  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
