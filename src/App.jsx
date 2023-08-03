import {
    NavLink,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import styles from "./App.module.css";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import useCartItems from "./hooks/useCartItems";

function App() {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useCartItems();

    const cartItemsCount = getCartItemsCount();

    function handleAddToCart(id, quantity) {
        const cartItem = cartItems.find(
            (cartItem) => cartItem.id === id
        );

        // if cart item already exists, increase quantity, else create new item
        if (cartItem !== undefined) {
            const newCartItems = cartItems.map((cartItem) => {
                if (cartItem.id === id) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + quantity,
                    };
                }
                return cartItem;
            });

            setCartItems(newCartItems);
        } else {
            setCartItems([...cartItems, { id, quantity }]);
        }
    }

    function handleDeleteFromCart(id) {
        const cartItem = cartItems.find(
            (cartItem) => cartItem.id === id
        );

        // if quantity more than 1, then reduce quantity else delete item
        if (cartItem.quantity > 1) {
            const newCartItems = cartItems.map((cartItem) => {
                if (cartItem.id === id) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity - 1,
                    };
                }
                return cartItem;
            });

            setCartItems(newCartItems);
        } else {
            setCartItems(
                cartItems.filter((cartItem) => cartItem.id !== id)
            );
        }
    }

    function getCartItemsCount() {
        return cartItems.reduce(
            (count, cartItem) => count + cartItem.quantity,
            0
        );
    }

    function handlePayAction() {
        setCartItems([]);
        navigate("/");
    }

    return (
        <div className="flex flex-col h-screen">
            <nav
                className={`${styles.navbar} py-4 px-6 bg-slate-600 text-4xl text-white flex items-center gap-10`}
            >
                <NavLink to="/">
                    <FaHome />
                </NavLink>
                <NavLink to="/shop" className="ml-auto text-3xl">
                    Shop
                </NavLink>
                <NavLink to="/cart" className="relative">
                    <FaShoppingCart />

                    {cartItemsCount > 0 && (
                        <div className="absolute top-[-5px] right-[-10px] bg-red-500 text-lg rounded-[50%] w-6 h-6 grid place-items-center text-white ">
                            {cartItemsCount}
                        </div>
                    )}
                </NavLink>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/shop"
                    element={
                        <Shop handleAddToCart={handleAddToCart} />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <Cart
                            handleDeleteFromCart={
                                handleDeleteFromCart
                            }
                            handlePayAction={handlePayAction}
                            cartItems={cartItems}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
