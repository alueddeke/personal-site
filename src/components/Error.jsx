import React from "react";

function Error({ message }) {
  return (
    <div className="flex items-center justify-center h-screen text-2xl text-red-500">
      Error: {message}
    </div>
  );
}

export default Error;
