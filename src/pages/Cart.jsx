import CartProduct from "../components/CartProduct";
import useFetch from "../hooks/useFetch";

export default function Cart() {
    const [products, productsLoading, productsError] = useFetch(
        "https://fakestoreapi.com/products"
    );
    const cartProducts = [
        { id: 1, quantity: 1 },
        { id: 3, quantity: 2 },
        { id: 6, quantity: 2 },
        { id: 2, quantity: 8 },
    ];

    if (productsLoading) {
        return <h1>Loading products...</h1>;
    }

    if (productsError) {
        return <h1>Something went wrong, please, reload the page</h1>;
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,300px)] gap-10 justify-center items-start pt-20 overflow-auto">
            {cartProducts.map((cartProduct) => {
                const product = products.find(
                    (product) => cartProduct.id === product.id
                );

                const productsJSX = [];

                for (let i = 0; i < cartProduct.quantity; i++) {
                    productsJSX.push(
                        <CartProduct
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
