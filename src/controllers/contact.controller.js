const SupplierContact = require('../models/Contact');

// Crear un nuevo contacto de proveedor
 async function createContact (req, res)  {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      position,
      created_by
    } = req.body;

    if(!first_name || first_name.trim() === "" || !email || email.trim() === ""){
      return  res.status(400).json({ message: "Los campos 'first_name' y 'email' son obligatorios." });
    }

    const contactPayload = {
      first_name,
      last_name, 
      email,
      phone,
      position,
      created_by,
      supplierId: req.params.id
    };

    Object.keys(contactPayload).forEach(key => {
      if (contactPayload[key] === undefined) delete contactPayload[key];
    });

    const newContact = await SupplierContact.create(contactPayload);
    return res.status(201).json(newContact);  

  }  catch (error) {
    console.error("CREATE CONTACT ERROR:", error);
    return res.status(500).json({ message: "Error creating contact", error: error.message });
  }
 }

// Obtener todos los contactos de un proveedor
async function getContactsBySupplier  (req, res) {
  try {
    const { supplierId } = req.params;
    const contacts = await SupplierContact.findAll({ where: { supplierId } });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("GET CONTACTS BY SUPPLIER ERROR:", error);
    res.status(500).json({ error: 'Error fetching contacts' });
  }
};
module.exports = {
  createContact,
  getContactsBySupplier,
};