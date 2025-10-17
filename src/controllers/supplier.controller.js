const Supplier = require("../models/Supplier");

// GET /suppliers
async function getSuppliers(req, res) {
  try {
    const suppliers = await Supplier.findAll();
    return res.json(suppliers);
  } catch (error) {
    console.error("GET SUPPLIERS ERROR:", error);
    return res.status(500).json({ message: "Error retrieving suppliers", error: error.message });
  }
}
// POST /suppliers
async function createSupplier(req, res) {
  try {
    // Valida y mapea los campos que tu modelo espera
    const {
      name,
      contact_name,
      contact_phone,
      contact_email,
      country,
      city,
      booth_number,
      presentation,
      industryId,    // si tu modelo lo acepta
      created_by     // opcional si manejas audit/owner
    } = req.body;

    // validaciones mínimas
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "El campo 'name' es obligatorio." });
    }

    // Construye objeto con solo campos del modelo
    const supplierPayload = {
      name,
      contact_name,
      contact_phone,
      contact_email,
      country,
      city,
      booth_number,
      presentation,
      industryId,
      created_by
    };

    // Elimina claves undefined para evitar problemas
    Object.keys(supplierPayload).forEach(key => {
      if (supplierPayload[key] === undefined) delete supplierPayload[key];
    });

    const newSupplier = await Supplier.create(supplierPayload);

    return res.status(201).json(newSupplier);
  } catch (error) {
    // Loguea el error completo en servidor (stack + detalles de validación)
    console.error("CREATE SUPPLIER ERROR:", error);
    // Si Sequelize arroja validations array, muéstralo legible
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
      const details = error.errors.map(e => ({ field: e.path, message: e.message }));
      return res.status(400).json({ message: "Validation error", details });
    }

    // FK / NOT NULL constraint
    if (error.original && error.original.code) {
      // Por ejemplo: '23503' foreign key violation, '23502' not_null_violation
      return res.status(500).json({
        message: "Database error",
        code: error.original.code,
        detail: error.original.detail || error.message
      });
    }

    return res.status(500).json({ message: "Error creating supplier", error: error.message });
  }
}
// PUT /suppliers/:id
async function updateSupplier(req,res){
    try {
        const {id} =req.params;
        const {
            name,
            contact_name,
            contact_phone,
            contact_email,
            country,
            city,
            booth_number,
            presentation,
            industryId,    // si tu modelo lo acepta
            created_by     // opcional si manejas audit/owner
          } = req.body;
      
          // validaciones mínimas
          if (!name || name.trim() === "") {
            return res.status(400).json({ message: "El campo 'name' es obligatorio." });
          } 
            // Construye objeto con solo campos del modelo
            const supplierPayload = {
                name,
                contact_name,
                contact_phone,
                contact_email,
                country,
                city,       
                booth_number,
                presentation,
                industryId,
                created_by
              };
          
              // Elimina claves undefined para evitar problemas
              Object.keys(supplierPayload).forEach(key => {
                if (supplierPayload[key] === undefined) delete supplierPayload[key];
              });
        const supplier = await Supplier.findByPk(id);
        if(!supplier){
            return res.status(404).json({message:"Supplier not found"});        
        }
        await supplier.update(supplierPayload);
        return res.json(supplier);
    }
    catch (error) {
        console.error("UPDATE SUPPLIER ERROR:", error);
        return res.status(500).json({ message: "Error updating supplier", error: error.message });  
    }
}
// DELETE /suppliers/:id
async function deleteSupplier(req,res){
    try {
        const {id} =req.params;
        const supplier = await Supplier.findByPk(id);
        if(!supplier){
            return res.status(404).json({message:"Supplier not found"});        
        }
        await supplier.destroy();
        return res.json({message:"Supplier deleted"});
    }
    catch (error) {
        console.error("DELETE SUPPLIER ERROR:", error);
        return res.status(500).json({ message: "Error deleting supplier", error: error.message });  
    }
}
module.exports = {
getSuppliers,
createSupplier,
updateSupplier,
deleteSupplier
};
