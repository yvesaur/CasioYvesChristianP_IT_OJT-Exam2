import React from "react";
import { AiFillEye } from "react-icons/ai";
import { MdOutlineDateRange } from "react-icons/md";
import { PiDotsSixVerticalBold, PiUserCircleFill } from "react-icons/pi";

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
  return (
    <div className="flex flex-col gap-3 pl-8 pr-8">
      {data.map((news) => (
        <div className="flex items-center gap-2 border-2 border-b-200 bg-gray-100 rounded-lg pl-4 pr-4 py-2">
          <div className="buttons self-start">
            <div className="flex gap-1 text-xl font-bold ">
              <PiDotsSixVerticalBold className="w-4 text-b-900 h-8" />
              <input className="w-3.5" type="checkbox" name="" id="" />
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
    </div>
  );
};

export default News;
