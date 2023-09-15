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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // State for checking the ticked news
  const [deleteSelectedNews, setDeleteSelectedNews] = useState(
    data.map(() => false)
  );

  // Delete selected news
  const handleDeleteCheckboxClick = (index: number) => {
    setDeleteSelectedNews((prevDeleteSelectedNews) =>
      prevDeleteSelectedNews.map((checked, i) =>
        i === index ? !checked : checked
      )
    );
  };

  // Delete all the selected news
  const handleDeleteButton = () => {
    const updatedData = data.filter((_, index) => !deleteSelectedNews[index]);

    data.length = 0;
    data.push(...updatedData);

    setDeleteSelectedNews(data.map(() => false));
    setSelectAllChecked(false);
  };

  // Select all the news in the data
  const handleSelectAllClick = () => {
    setDeleteSelectedNews((prevDeleteSelectedNews) =>
      prevDeleteSelectedNews.map(() => !prevDeleteSelectedNews[0])
    );
    setSelectAllChecked(!selectAllChecked);
  };

  // Disable scrolling when news content is clicked
  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
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
      <div id="navbar" className="flex justify-between items-center p-3">
        <div className="navigation-functions flex flex-col gap-1">
          <h1 className="font-bold text-2xl">News Articles</h1>
          <div className="flex gap-3">
            <input
              className="w-3.5"
              type="checkbox"
              name="selectAll"
              id=""
              checked={selectAllChecked}
              onChange={handleSelectAllClick}
            />
            <button className="p-1 rounded-lg border-2 border-blue-400 bg-blue-200 text-blue-500 w-20">
              Publish
            </button>
            <button
              className="p-1 rounded-lg border-2 border-red-400 bg-red-200 text-red-400 w-20 "
              onClick={handleDeleteButton}
            >
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
      <div id="newsList" className="flex flex-col gap-3 pl-8 pr-8">
        {data.map((news, index) => (
          <div
            className="flex items-center gap-2 border-2 border-b-200 bg-gray-100 rounded-lg pl-4 pr-4 py-2"
            onClick={() => {
              openDialog();
              setSelectedIndex(index);
            }}
            key={news.id}
          >
            <div className="buttons self-start">
              <div className="flex gap-1 text-xl font-bold ">
                <PiDotsSixVerticalBold className="w-4 text-b-900 h-8" />
                <input
                  className="w-3.5"
                  type="checkbox"
                  name=""
                  id=""
                  checked={deleteSelectedNews[index]}
                  onChange={() => {
                    handleDeleteCheckboxClick(index);
                  }}
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
                  <p className="">{news.author}</p>
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
                    <AiFillEye />{" "}
                    <span className="min-w-max cursor-pointer"> Read Full</span>
                  </span>
                </p>
              </div>
            </div>
            <div
              className="news-tags flex gap-2 text-green-500 ml-auto self-start flex-wrap"
              onClick={(e) => e.stopPropagation()}
            >
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
        {data.length - 1 >= 0 ? (
          <div
            className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 ${
              isDialogOpen ? "block" : "hidden"
            }`}
          >
            <dialog
              id="ShowMore"
              open={isDialogOpen}
              onClose={closeDialog}
              className="w-[500px] h-[500px] overflow-auto rounded-lg p-10 fixed top-[25%]"
            >
              <h1 className=" flex justify-between font-bold text-[1.2rem]">
                {data[selectedIndex].title}
                <span onClick={closeDialog}>
                  <AiOutlineCloseCircle />
                </span>
              </h1>
              <p className="my-3 font-bold text-gray-400">
                {data[selectedIndex].author} | {data[selectedIndex].date}
              </p>
              <p className="border-dotted border-2 border-black p-3">
                {data[selectedIndex].content}
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
        ) : (
          <div>No current news.</div>
        )}
      </div>
    </>
  );
};

export default News;
