import React from "react";
import "./App.css";
import News from "./components/News";
import emailData from "./data/news_mock_dataset.json";

const App: React.FC = () => {
  return (
    <>
      <News data={emailData}></News>
    </>
  );
};

export default App;
