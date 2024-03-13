import ReactDOM from 'react-dom/client'
import React from 'react'

import CalendarView from './Calendar.tsx';
import ErrorPage from './error-page.tsx';
import { Product, Order } from "./data";
import Dashboard from './Dashboard.tsx';
import Products from './Products.tsx';
import Orders from './Orders.tsx';
import App from './App.tsx'
import './index.css'

import productList from './assets/data/products.json';
import orderList from './assets/data/orders.json';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';


let orders = orderList.map(order => {
  function dateStringToDate(date: string): Date {
    let [day, month, year] = date.split('-');
    return new Date(
      Number.parseInt(day),
      Number.parseInt(month),
      Number.parseInt(year),
    );
  }

  return {
    id: order.id,
    orderDate: dateStringToDate(order.orderDate),
    customerName: order.customerName,
    status: order.status,
    totalAmount: Number.parseFloat(order.totalAmount.slice(1)),
    expectedDelivery: (order.expectedDelivery === undefined) ?
      undefined :
      dateStringToDate(order.expectedDelivery)
  } as Order
});
let products = productList as Product[];

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Navigate to="/dashboard" replace={true} />
      <App productList={products} orderList={orders} />
    </>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/orders',
        element: <Orders />
      },
      {
        path: '/calendar',
        element: <CalendarView />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
