import React from "react";

function Error({ message }) {
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-950 text-2xl text-red-400">
      Error: {message}
    </div>
  );
}

export default Error;
