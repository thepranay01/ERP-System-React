import { Product, Order } from "./data";
import { createContext } from "react";

export type AppState = {
    orders: Order[],
    products: Product[],
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>,
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
}

const AppContext = createContext<null | AppState>(null);

export default AppContext;
