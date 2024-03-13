export type Product = {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[]
}

export type Order = {
    id: number,
    orderDate: Date,
    customerName: string,
    status: "pending" | "shipped" | "delivered",
    totalAmount: number,
    expectedDelivery?: Date,
}