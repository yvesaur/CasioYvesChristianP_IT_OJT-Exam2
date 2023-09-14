import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-3">
      <div className="navigation-functions flex flex-col gap-2">
        <h1 className="font-bold text-2xl">News Articles</h1>
        <div className="flex gap-3">
          <input className="w-3.5" type="checkbox" name="" id="" />
          <button className="p-1 rounded-lg border-2 border-blue-400 bg-blue-200 text-blue-500 w-20">
            Publish
          </button>
          <button className="p-1 rounded-lg border-2 border-red-400 bg-red-200 text-red-400 w-20">
            Delete
          </button>
        </div>
      </div>
      <div className="navigation-search flex items-end">
        <input
          className="rounded-md border-2 border-#F3F5F7-500 p-1 w-80"
          type="search"
          name="email-search"
          id=""
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default Navbar;
