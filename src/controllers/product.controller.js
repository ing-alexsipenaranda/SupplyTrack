const Product = require('../models/Product');

//GET /suppliers/:id/products
async function getProductsBySupplier(req, res) {
  const supplierId = req.params.id;
  try {
    const products = await Product.findAll({ where: { supplierId } });
    return res.json(products);
  } catch (error) {
    console.error("GET PRODUCTS BY SUPPLIER ERROR:", error);
    return res.status(500).json({ message: "Error retrieving products for supplier", error: error.message });
  }
}
// POST /suppliers/:id/products
async function createProductForSupplier(req, res) {
  const supplierId = req.params.id;
  try{
    const {id} = req.params;
    const {
      name,
      description,
      price,
      stock,
      categoryId,   // si tu modelo lo acepta
      created_by    // opcional si manejas audit/owner
    } = req.body;
    // validaciones mínimas
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "El campo 'name' es obligatorio." });
    } 
      // Construye objeto con solo campos del modelo
      const productPayload = {
          name,
          description,
          price,
          stock,
          categoryId,
          created_by,
          supplierId  // Asocia el producto al supplier
        };
    
        // Elimina claves undefined para evitar problemas
        Object.keys(productPayload).forEach(key => {
          if (productPayload[key] === undefined) delete productPayload[key];
        });
    const newProduct = await Product.create(productPayload);
    return res.status(201).json(newProduct);
  }
  catch (error) {
    console.error("CREATE PRODUCT FOR SUPPLIER ERROR:", error);
    return res.status(500).json({ message: "Error creating product for supplier", error: error.message });
  }
}
async function deleteProductBySupplier(req, res) {
  try{
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if(!product){
      return res.status(404).json({message:"Product not found"});        
    }
    await product.destroy();
    return res.json({message:"Product deleted"});
  }catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return res.status(500).json({ message: "Error deleting product", error: error.message });
  }
}
module.exports = {
  getProductsBySupplier,
  createProductForSupplier,
  deleteProductBySupplier
};