import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {

  try {
    const products = [
      { title: "dell lat 3", image: "https://m.media-amazon.com/images/I/91H3z3qIQkL._AC_UF1000,1000_QL80_.jpg", price: 1500, stock: 80 },
      // {title: "product 2",image:"image1.png", price: 20, stock:80},
      // {title: "product 3",image:"image1.png", price: 15, stock:50},
    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
      await productModel.insertMany(products)
    }
  } catch (err) {
    console.log("cannot see database", err)
  }
}