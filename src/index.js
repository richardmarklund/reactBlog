import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddBlogPostComponent } from "./addPost";
import { PostProvider } from "./PostState";
import { AuthProvider } from "./authState"
import { LoginComponent } from "./login"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PostProvider>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
            <Route path="addPost" element={<AddBlogPostComponent />} />
            <Route path="login" element={<LoginComponent />} />
        </Routes>
        </AuthProvider>
      </PostProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
