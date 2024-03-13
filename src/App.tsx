import Navbar from "./components/Navbar";
import { Product, Order } from "./data";
import AppContext from "./context";

import { Outlet } from "react-router-dom";
import { useState } from "react";

import { ThemeProvider } from "./components/theme-provider";
import { useTheme } from "./components/theme-provider";



function App(props: { orderList: Order[], productList: Product[] }) {
  const [productsList, setProductsList] = useState<Product[]>(props.productList);
  const [orderList, setOrderList] = useState<Order[]>(props.orderList);

  let appState = {
    orders: orderList,
    products: productsList,
    setOrders: setOrderList,
    setProducts: setProductsList,
  }

  return (
    <AppContext.Provider value={appState}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex h-full">
          <Navbar />
          <div className="ml-40 px-2 pl-4 grow border-l h-full">
            <Outlet />
          </div>
        </div>
      </ThemeProvider>
    </AppContext.Provider>)
}

export default App
