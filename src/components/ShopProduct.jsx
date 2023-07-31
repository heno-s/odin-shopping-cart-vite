import { number, string } from "prop-types";

export default function ShopProduct({ id, image, title, price }) {
    return (
        <div className="flex flex-col gap-3 items-center px-5 justify-center">
            <span className="font-bold text-center">{title}</span>
            <img
                src={image}
                alt={title}
                className="w-48 h-48 object-contain"
            />
            <strong className="text-3xl">{price} €</strong>
        </div>
    );
}

ShopProduct.propTypes = {
    id: number,
    image: string,
    title: string,
    price: number,
};
