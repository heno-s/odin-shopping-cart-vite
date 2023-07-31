import { number, string } from "prop-types";

export default function CartProduct({ title, image, price }) {
    return (
        <div className="flex flex-col gap-3 items-center px-5 justify-center">
            <span className="font-bold text-center">{title}</span>
            <img
                src={image}
                alt={title}
                className="w-48 h-48 object-contain"
            />
            <strong className="text-3xl">{price} €</strong>
            <button className="border-x-2 border-y-2 py-2 px-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                Remove
            </button>
        </div>
    );
}

CartProduct.propTypes = {
    image: string,
    title: string,
    price: number,
};
