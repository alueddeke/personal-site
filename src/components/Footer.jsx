import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-500 w-full border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <p className="text-sm font-medium text-zinc-500">
            This project was created using <strong>REACT, TAILWINDCSS </strong>
            and <strong>CONTENTFUL</strong>. {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
