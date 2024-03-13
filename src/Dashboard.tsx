import DashboardCard from "./components/Card";

import AppContext from "./context";
import { useContext } from "react";

export default function Dashboard() {
    const { products, orders } = useContext(AppContext)!;

    return <>
        <main className="grow w-full pt-3">
            <section className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 content-start">
                <DashboardCard data={products.length}
                    title={"Total Products"} />
                <DashboardCard data={orders.length}
                    title={"Total Orders"} />
                <DashboardCard data={
                    (new Set(products.map(product => product.category))).size
                }
                    title={"Unique Categories"} />
                <DashboardCard data={
                    (new Set(products.map(product => product.brand))).size
                }
                    title={"Unique Brands"} />
                <DashboardCard data={
                    (new Set(orders.map(order => order.customerName))).size
                }
                    title={"Happy Customers"} />
                <DashboardCard data={
                    orders.filter(order => order.status === "delivered").length
                }
                    title={"Deliveries"} />
            </section>
        </main>
    </>
}