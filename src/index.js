import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddBlogPostComponent } from "./addPost";
import { PostProvider } from "./PostState";
import { LoginComponent } from "./login";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PostProvider>
        <CookiesProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="addPost" element={<AddBlogPostComponent />} />
            <Route path="login" element={<LoginComponent />} />
          </Routes>
        </CookiesProvider>
      </PostProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
