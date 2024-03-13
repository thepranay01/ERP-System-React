import { useContext, useRef } from "react";
import AppContext from "./context";

import { Product } from "./data";

function AddProductForm(props: { addProduct: (product: Product) => void }) {
    return (
        <div className="flex flex-col w-1/2 hidden" id='addProduct'>
            <span className="material-symbols-outlined cursor-pointer self-end p-2" onClick={() => {
                document.getElementById('addProduct')!.style.display = 'none';
            }}>close</span>
            <form className="flex flex-col gap-2" onSubmit={e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = new FormData(form);
                const product = Object.fromEntries(data.entries()) as any as Product;
                console.log(`To add`, product);
                props.addProduct(product);
                document.getElementById('addProduct')!.style.display = 'none';
            }}>
                <input className="" type="number" id="id" name="id" placeholder="ID" />
                <input className="" type="text" id="name" name="name" placeholder="Name" />
                <input type="text" id="description" name="description" placeholder="Description" />
                <input type="number" id="price" name="price" placeholder="Price" />
                <input type="text" id="brand" name="brand" placeholder="Brand" />
                <button className="rounded-lg py-2 px-3 border-solid border" type="submit">Add</button>
            </form>
        </div>);
}


export default function Products() {
    const { products, setProducts } = useContext(AppContext)!;
    let updateId: null | number = null;

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
    function deleteProduct(id: number) {
        console.log(id);
        setProducts(products.filter(product => product.id !== id))
    }

    return <>
        <section className="my-3">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-2">
                Add a product
            </h3>
            <button className="rounded-lg py-2 px-3 border-solid border" onClick={() => {
                document.getElementById('addProduct')!.style.display = 'flex';
            }}>Add</button>
            <AddProductForm addProduct={(newProduct: Product) => {
                setProducts([newProduct, ...products]);
            }} />
        </section>
        <div className="hidden absolute gap-2 justify-start transition-all overflow-hidden" id="tooltip">
            <span className="material-symbols-outlined select-none">edit</span>
            <span className="material-symbols-outlined select-none cursor-pointer" onClick={() => {
                deleteProduct(updateId!);
                closeTooltip();
            }}>delete</span>
            <span className="material-symbols-outlined select-none cursor-pointer" onClick={closeTooltip}>close</span>
        </div>
        <table className="table-fixed border-collapse border border-solid rounded border-white/40">
            <thead>
                <tr>
                    <th>ID</th>
                    <th className="text-left">Name</th>
                    <th>Description</th>
                    <th>Price($)</th>
                    <th>Brand</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(product => {
                        return <tr key={product.id} className="h-6 overflow-hidden border-y bofder-solid border-white/10 hover:bg-table-hover-bg hover:text-table-hover-color cursor-pointer" onClick={rowClickHandler} >
                            <td className="text-center p-1">{product.id}</td>
                            <td className="capitalize p-1">{product.title}</td>
                            <td className="p-1 w-3/4 overflow-hidden">{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.brand}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
}