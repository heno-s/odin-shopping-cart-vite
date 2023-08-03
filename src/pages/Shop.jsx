import { func } from "prop-types";
import ShopProduct from "../components/ShopProduct";
import { useEffect, useState } from "react";

import useFetch from "../hooks/useFetch";

export default function Shop({ handleAddToCart }) {
    const [products, productsLoading, productsError] = useFetch(
        "https://fakestoreapi.com/products"
    );

    const [categories, categoriesLoading, categoriesError] = useFetch(
        "https://fakestoreapi.com/products/categories"
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

Shop.propTypes = {
    handleAddToCart: func,
};
