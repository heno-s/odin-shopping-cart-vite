import { number, string } from "prop-types";
import { useEffect, useState } from "react";

export default function ShopProduct({ id, image, title, price }) {
    const [productCount, setProductCount] = useState("1");
    useEffect(() => {
        if (+productCount < 1) {
            setProductCount("1");
        }
    }, [productCount]);

    function incrementCount() {
        setProductCount((+productCount + 1).toString());
    }

    function handleSetProductCount(evt) {
        setProductCount(evt.target.value);
    }

    function decrementCount() {
        setProductCount((+productCount - 1).toString());
    }

    return (
        <div className="flex flex-col gap-3 items-center px-5 justify-center">
            <span className="font-bold text-center">{title}</span>
            <img
                src={image}
                alt={title}
                className="w-48 h-48 object-contain"
            />
            <strong className="text-3xl">{price} €</strong>
            <form className="flex justify-between w-[50%] text-xl gap-4">
                <div className="flex text-2xl gap-2">
                    <button onClick={decrementCount} type="button">
                        -
                    </button>
                    <input
                        value={productCount}
                        onChange={handleSetProductCount}
                        type="number"
                        className="w-[2ch] text-center"
                    />
                    <button onClick={incrementCount} type="button">
                        +
                    </button>
                </div>

                <button className="py-2 px-4 border-black border-x-2 border-y-2">
                    Add
                </button>
            </form>
        </div>
    );
}

ShopProduct.propTypes = {
    id: number,
    image: string,
    title: string,
    price: number,
};
