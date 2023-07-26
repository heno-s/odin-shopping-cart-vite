import { NavLink, Route, Routes } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import styles from "./App.module.css";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

function App() {
    return (
        <div className="flex flex-col h-screen">
            <nav
                className={`${styles.navbar} py-4 px-6 bg-slate-600 text-4xl text-white flex items-center gap-5`}
            >
                <NavLink to="/">
                    <FaHome />
                </NavLink>
                <NavLink to="/shop" className="ml-auto text-3xl">
                    Shop
                </NavLink>
                <NavLink to="/cart">
                    <FaShoppingCart />
                </NavLink>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </div>
    );
}

export default App;
