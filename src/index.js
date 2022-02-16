import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddBlogPostComponent } from "./addPost";
import { PostProvider } from "./PostState";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PostProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="addPost" element={<AddBlogPostComponent />} />
        </Routes>
      </PostProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
