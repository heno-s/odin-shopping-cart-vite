import CartProduct from "../components/CartProduct";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Cart() {
    const [products, productsLoading, productsError] = useFetch(
        "https://fakestoreapi.com/products"
    );
    const [cartItems, setCartItems] = useLocalStorage(
        "cartItems",
        []
    );

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

    if (productsLoading) {
        return <h1>Loading products...</h1>;
    }

    if (productsError) {
        return <h1>Something went wrong, please, reload the page</h1>;
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,300px)] gap-10 justify-center items-start pt-20 overflow-auto">
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
    );
}
