import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    { title: "dell lat 3", image: "https://m.media-amazon.com/images/I/91H3z3qIQkL._AC_UF1000,1000_QL80_.jpg", price: 1500, stock: 80 },
    // {title: "product 2",image:"image1.png", price: 20, stock:80},
    // {title: "product 3",image:"image1.png", price: 15, stock:50},
    // {title: "product 4",image:"image1.png", price: 25, stock:70},
    // {title: "product 5",image:"image1.png", price: 5, stock:90},
    // {title: "product 6",image:"image1.png", price: 30, stock:60},
    // {title: "product 7",image:"image1.png", price: 35, stock:40},
    // {title: "product 8",image:"image1.png", price: 40, stock:30},
    // {title: "product 9",image:"image1.png", price: 45, stock:20},
    // {title: "product 10",image:"image1.png", price: 50, stock:10},
  ];

  const existingProducts = await getAllProducts();

  if (existingProducts.length === 0) {
    await productModel.insertMany(products)
  }
}