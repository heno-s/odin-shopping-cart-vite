import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import styles from "./App.module.css";

function App() {
    return (
        <div className="flex flex-col h-screen">
            <header
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
            </header>
        </div>
    );
}

export default App;
