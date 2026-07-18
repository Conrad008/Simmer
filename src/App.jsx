import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Navbar from "./components/Navbar"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Recipes from "./pages/Recipes"
import Home from "./pages/Home"
import FavouritePage from "./pages/FavouritePage"
import MyRecipes from "./pages/Myrecipes"
import RecipeDetail from "./pages/RecipeDetail"
import Footer from "./components/Footer"

function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<FavouritePage />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
