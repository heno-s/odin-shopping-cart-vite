import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
    return (
        <div
            className={`${styles.container} flex items-center flex-col gap-6 justify-center`}
        >
            <span
                className={`${styles["app-title"]} text-3xl text-center text-white`}
            >
                Explore Innovative Products
            </span>

            <Link to="/shop">
                <button className="py-4 px-7 bg-white">Shop</button>
            </Link>
        </div>
    );
}
