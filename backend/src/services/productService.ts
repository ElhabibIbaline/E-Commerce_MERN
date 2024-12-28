import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {

  try {
    const products = [

      { title: "dell Laptop", 
        image: "https://m.media-amazon.com/images/I/91H3z3qIQkL._AC_UF1000,1000_QL80_.jpg", 
        price: 1500, 
        stock: 80 
      },
      { title: "Asus Laptop", 
        image: "https://www.electrodepot.fr/media/catalog/product/cache/1a40d1f945549a9ec18309b0a600e55c/P981224.jpg", 
        price: 2500, 
        stock: 80 
      },
      { title: "HP Laptop", 
        image: "https://www.itjustgood.com/media/catalog/product/cache/5de929452a591667dc63438c7514240a/u/l/ultrabook-reconditionne-hp-elitebook-830-g6-itjustgood-w11_11.jpg", 
        price: 4000, 
        stock: 80 
      },

    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
      await productModel.insertMany(products)
    }
  } catch (err) {
    console.log("cannot see database", err)
  }
}