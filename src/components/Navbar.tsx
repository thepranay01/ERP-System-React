import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="w-40 h-full fixed" id="nav">
            <ul className="flex flex-col">

                <Link className="p-auto" to={'/dashboard'}>
                    <li className="py-2 px-1 hover:bg-nav-hover-bg">Dashboard</li>
                </Link>
                <Link className="p-auto" to={'/products'}>
                    <li className="py-2 px-1 hover:bg-nav-hover-bg">Product Managment</li>
                </Link>
                <Link className="p-auto" to={'/orders'}>
                    <li className="py-2 px-1 hover:bg-nav-hover-bg">Order Management</li>
                </Link>
                <Link className="p-auto" to={'/calendar'}>
                    <li className="py-2 px-1 hover:bg-nav-hover-bg">Order Calender</li>
                </Link>

            </ul>
        </nav>);
}
