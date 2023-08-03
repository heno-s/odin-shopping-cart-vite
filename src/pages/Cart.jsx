import CartProduct from "../components/CartProduct";
import useFetch from "../hooks/useFetch";
import { func, array } from "prop-types";

export default function Cart({
    cartItems,
    handleDeleteFromCart,
    handlePayAction,
}) {
    const [products, productsLoading, productsError] = useFetch(
        "https://fakestoreapi.com/products"
    );

    function getTotalPrice() {
        return cartItems.reduce((total, cartItem) => {
            const product = products.find(
                (product) => product.id === cartItem.id
            );
            return total + cartItem.quantity * product.price;
        }, 0);
    }

    if (cartItems.length === 0) {
        return (
            <span className="text-center mt-6 font-bold">
                No items in Cart
            </span>
        );
    }

    if (productsLoading) {
        return <h1>Loading products...</h1>;
    }

    if (productsError) {
        console.log(productsError);
        return <h1>Something went wrong, please, reload the page</h1>;
    }

    return (
        <div className="pt-20 pb-10 overflow-auto">
            <div className="grid grid-cols-[repeat(auto-fill,300px)] gap-10 justify-center">
                {cartItems.map((cartProduct) => {
                    const product = products.find(
                        (product) => cartProduct.id === product.id
                    );
                    const productsJSX = [];
                    for (let i = 0; i < cartProduct.quantity; i++) {
                        productsJSX.push(
                            <CartProduct
                                handleDeleteFromCart={
                                    handleDeleteFromCart
                                }
                                key={product.id + i}
                                {...product}
                            />
                        );
                    }
                    return productsJSX;
                })}
            </div>
            <div className="flex flex-col gap-3 items-center mt-10">
                <span className="text-xl">
                    Total: <strong>{getTotalPrice()} €</strong>
                </span>
                <button
                    onClick={handlePayAction}
                    className="py-2 px-5 bg-red-500 text-white text-2xl"
                >
                    Pay
                </button>
            </div>
        </div>
    );
}

Cart.propTypes = {
    cartItems: array,
    handleDeleteFromCart: func,
    handlePayAction: func,
};
