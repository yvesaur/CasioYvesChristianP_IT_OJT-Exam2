import React, { useEffect, useState } from "react";
import { AiFillEye, AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";
import { PiDotsSixVerticalBold, PiUserCircleFill } from "react-icons/pi";
import "./News.css";

interface newsData {
  id: number;
  author: string;
  title: string;
  content: string;
  date: string;
}

interface newsDummyData {
  data: newsData[];
}

const News: React.FC<newsDummyData> = ({ data }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (isDialogOpen) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "auto";
    }

    return () => {
      // Cleanup: Re-enable scrolling when the component unmounts
      document.body.style.overflow = "auto";
    };
  }, [isDialogOpen]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-3 pl-8 pr-8">
        {data.map((news) => (
          <div
            className="flex items-center gap-2 border-2 border-b-200 bg-gray-100 rounded-lg pl-4 pr-4 py-2"
            onClick={openDialog}
          >
            <div className="buttons self-start">
              <div className="flex gap-1 text-xl font-bold ">
                <PiDotsSixVerticalBold className="w-4 text-b-900 h-8" />
                <input
                  className="w-3.5"
                  type="checkbox"
                  name=""
                  id=""
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </div>
            </div>
            <div className="news-information">
              <h1 className="font-bold">{news.title}</h1>
              <div className="author-date flex gap-3">
                <span className="flex justify-center items-center gap-1">
                  <PiUserCircleFill className="text-green-500" />
                  <p>{news.author}</p>
                </span>
                <span className="flex justify-center items-center gap-1">
                  <MdOutlineDateRange className="text-green-500" />
                  <p>{news.date}</p>
                </span>
              </div>
              <div className="content-summary">
                <p className="flex gap-1">
                  {news.content.split(" ").slice(0, 11).join(" ")}{" "}
                  {news.content.split(" ")[12]}...{" "}
                  <span className="flex items-center text-blue-600">
                    {" "}
                    <AiFillEye /> <p> See More</p>
                  </span>
                </p>
              </div>
            </div>
            <div className="news-tags flex gap-2 text-green-500 ml-auto self-start">
              <span className="news-tag border-2 border-green-200 bg-green-100 rounded-lg p-1">
                <p>#Sports</p>
              </span>
              <span className="news-tag border-2 border-green-200 bg-green-100 rounded-lg p-1">
                <p>#Worldwide</p>
              </span>
              <span className="news-tag border-2 border-green-200 bg-green-100 rounded-lg p-1">
                <p>#Local</p>
              </span>
            </div>
          </div>
        ))}
        <div
          className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 ${
            isDialogOpen ? "block" : "hidden"
          }`}
        >
          <dialog
            id="ShowMore"
            open={isDialogOpen}
            onClose={closeDialog}
            className="w-[500px] h-auto rounded-lg p-10 fixed top-[25%]"
          >
            <h1 className=" flex justify-between font-bold text-[1.2rem]">
              {data[1].title}{" "}
              <span onClick={closeDialog}>
                <AiOutlineCloseCircle />
              </span>
            </h1>
            <p className="my-3 font-bold text-gray-400">
              {data[1].author} | {data[1].date}
            </p>
            <p className="border-dotted border-2 border-black p-3">
              {data[1].content}
            </p>
            <div className="flex gap-1 justify-center my-2">
              <button className="p-1 rounded-lg border-2 border-blue-400 bg-blue-400 text-white w-15">
                Publish
              </button>
              <button className="p-1 rounded-lg border-2 border-red-500 bg-red-500 text-white w-15">
                Delete
              </button>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default News;
