import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage.js"
import Register from "./pages/Auth/Register.js"
import About from "./pages/About.js"
import Contact from "./pages/Contact.js"
import PageNotFound from "./pages/PageNotFound.js"
import Policy from "./pages/Policy.js"
// import dotenv from "dotenv"

// dotenv.config({
//   path: "./env"
// })

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
