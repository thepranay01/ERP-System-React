import { useContext } from "react";
import AppContext from "./context";
import { Order } from "./data";

function AddOrderForm(props: { addOrder: (order: Order) => void }) {
    return (
        <div className="flex-col w-1/2 hidden" id='addOrder'>
            <span className="material-symbols-outlined cursor-pointer self-end p-2" onClick={() => {
                document.getElementById('addOrder')!.style.display = 'none';
            }}>close</span>
            <form className="flex flex-col gap-2" onSubmit={e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = new FormData(form);
                const order = Object.fromEntries(data.entries()) as any as Order;
                console.log(`To add`, order);
                props.addOrder(order);
                document.getElementById('addOrder')!.style.display = 'none';
            }}>
                <input className="" type="date" id="date" name="orderDate" placeholder="Order Date" />
                <input className="" type="number" id="id" name="id" placeholder="ID" />
                <input type="text" id="name" name="customerName" placeholder="Customer Name" />
                <select className="" name="status" onChange={(e) => {
                    const deliveryInput = document.getElementById('deliveryDate')! as HTMLInputElement;
                    if ((e.target as HTMLSelectElement).value === "delivered") {
                        deliveryInput.disabled = true;
                    } else deliveryInput.disabled = false;
                }}>
                    <option value="pending" selected>Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="shipped">Shipped</option>
                </select>
                <input type="number" id="amount" name="totalAmount" placeholder="Total Amount" />
                <input type="date" id="deliveryDate" name="expectedDelivery" placeholder="Expected Delivery Date" />
                <button className="rounded-lg py-2 px-3 border-solid border" type="submit">Add</button>
            </form>
        </div>);
}


export default function Orders() {
    const { setOrders, orders } = useContext(AppContext)!;
    let updateId: null | number = null;

    function getDateString(date?: Date) {
        console.log(date)
        if (date === undefined || date as any == "") return '-'
        function toString(num: number): string {
            return ((num < 10) ? `0${num}` : num.toString());
        }
        return `${toString(date.getDate())}-${toString(date.getMonth())}-${toString(date.getFullYear())}`
    }

    function rowClickHandler(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
        const x = e.clientX.toString();
        const y = e.clientY.toString();

        const tooltip = document.getElementById('tooltip')!;
        updateId = Number.parseInt((e.currentTarget as HTMLTableRowElement).firstChild!.textContent!.trim());
        tooltip.style.display = 'flex';
        tooltip.style.top = `${y}px`;
        tooltip.style.left = `${x}px`;
        setTimeout(() => tooltip.style.width = '100px', 0);
    }
    function closeTooltip() {
        const tooltip = document.getElementById('tooltip')!
        tooltip.style.width = '0px'
        setTimeout(() => tooltip.style.display = 'none', 150);
        updateId = null;
    }
    function deleteOrder(id: number) {
        console.log(id);
        setOrders(orders.filter(order => order.id !== id));
    }


    return <>
        <div className="hidden absolute gap-2 justify-start transition-all overflow-hidden" id="tooltip">
            <span className="material-symbols-outlined select-none">edit</span>
            <span className="material-symbols-outlined select-none cursor-pointer" onClick={() => {
                deleteOrder(updateId!);
                closeTooltip();
            }}>delete</span>
            <span className="material-symbols-outlined select-none cursor-pointer" onClick={closeTooltip}>close</span>
        </div>
        <section className="my-3">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-2">
                Add a product
            </h3>
            <button className="rounded-lg py-2 px-3 border-solid border" onClick={() => {
                document.getElementById('addOrder')!.style.display = 'flex';
            }}>Add</button>
            <AddOrderForm addOrder={(newOrder: Order) => {
                setOrders([newOrder, ...orders]);
            }} />
        </section>
        <table className="table-fixed border-collapse border w-[90%] border-solid rounded border-white/40">
            <thead>
                <tr>
                    <th className="p-1 w-6 text-center">ID</th>
                    <th className="text-center px-3 w-40">Date</th>
                    <th className="text-left w-80">Customer Name</th>
                    <th className="text-left w-24">Status</th>
                    <th className="text-left w-28">Amount($)</th>
                    <th className="text-center w-36">Expected Delivery</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map(order => {
                        return <tr key={order.id} className="h-4 overflow-hidden border-y bofder-solid border-white/10 hover:bg-table-hover-bg hover:text-table-hover-color cursor-pointer" onClick={rowClickHandler}>
                            <td className="p-1 text-center">{order.id}</td>
                            <td className="p-1 px-3 text-center">{getDateString(order.orderDate)}</td>
                            <td className="p-1 px text-left overflow-x-clip">{order.customerName}</td>
                            <td className="p-1 text-left capitalize">{order.status}</td>
                            <td className="p-1 text-center">{order.totalAmount}</td>
                            <td className="p-1 text-center">{
                                (order.expectedDelivery === undefined)
                                    ? "-" : getDateString(order.expectedDelivery)
                            }</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
}