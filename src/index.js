import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddBlogPostComponent } from "./addPost";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="addPost" element={<AddBlogPostComponent />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
