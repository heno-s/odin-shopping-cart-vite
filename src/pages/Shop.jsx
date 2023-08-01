import ShopProduct from "../components/ShopProduct";
import { useEffect, useState } from "react";

import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Shop() {
    const [products, productsLoading, productsError] = useFetch(
        "https://fakestoreapi.com/products"
    );

    const [categories, categoriesLoading, categoriesError] = useFetch(
        "https://fakestoreapi.com/products/categories"
    );
    const [cartItems, setCartItems] = useLocalStorage(
        "cartItems",
        []
    );
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        if (categories !== null) {
            setActiveCategory(categories[0]);
        }
    }, [categories]);

    function handleCategoryChange(categoryName) {
        setActiveCategory(categoryName);
    }
    function handleAddToCart(id, quantity) {
        const cartItem = cartItems.find(
            (cartItem) => cartItem.id === id
        );
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

    if (productsError || categoriesError) {
        return <h1>Something went wrong, reload the page</h1>;
    }

    return (
        <div className="overflow-auto pb-6">
            {categoriesLoading && <h1>Loading categories...</h1>}
            {categories !== null && (
                <div className="flex gap-4 overflow-auto py-4 px-1 mb-4 text-2xl font-bold">
                    {categories.map((categoryName) => (
                        <button
                            key={categoryName}
                            className={
                                categoryName === activeCategory
                                    ? "text-orange-400"
                                    : ""
                            }
                            onClick={() =>
                                handleCategoryChange(categoryName)
                            }
                        >
                            {categoryName}
                        </button>
                    ))}
                </div>
            )}

            {productsLoading && (
                <h1 className="text-3xl">Loading products...</h1>
            )}

            {products !== null && (
                <div className="grid grid-cols-[repeat(auto-fill,300px)] gap-10 justify-center">
                    {products.map((productData) =>
                        productData.category === activeCategory ? (
                            <ShopProduct
                                handleAddToCart={handleAddToCart}
                                key={productData.id}
                                {...productData}
                            />
                        ) : null
                    )}
                </div>
            )}
        </div>
    );
}
