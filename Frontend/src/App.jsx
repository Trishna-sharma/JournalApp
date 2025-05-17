import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Signin } from "./pages/signin";
import { Blog } from "./pages/blog";
import { Blogs } from "./pages/blogs";
import { Signup } from "./pages/signup";
import { Publish } from "./pages/publish";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blog/:id" element={<blogPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />}></Route>
          <Route path="" element={<Signin />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
