import useLocalStorage from "./useLocalStorage";

export default function useCartItems(initialValue = []) {
    return useLocalStorage("cartItems", initialValue);
}
