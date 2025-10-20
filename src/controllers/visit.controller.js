const Visit = require('../models/Visit');

//GET /suppliers/:id/visits
async function getVisitToSupplier(req, res) {
    const supplierId = req.params.id;
    try{
        const visits = await Visit.findAll({ where: { supplierId } });
        return res.json(visits);
    }catch (error) {
        console.error("GET VISITS BY SUPPLIER ERROR:", error);
        return res.status(500).json({ message: "Error retrieving visits for supplier", error: error.message });
}}
async function createVisitToSupplier(req, res) {
    const supplierId = req.params.id;
    try{
      const {
        title,
        description,
        date,
        eventId,
        created_by    // opcional si manejas audit/owner
      } = req.body;
      // validaciones mínimas
      if (!title || title.trim() === "") {
        return res.status(400).json({ message: "El campo 'title' es obligatorio." });
      }else if (!eventId){
        return res.status(400).json({ message: "El campo 'eventId' es obligatorio." });
      } 
        // Construye objeto con solo campos del modelo
        const visitPayload = {
            title,
            description,
            date,
            eventId,
            created_by,
            supplierId  // Asocia la visita al supplier
          };
      
          // Elimina claves undefined para evitar problemas
          Object.keys(visitPayload).forEach(key => {
            if (visitPayload[key] === undefined) delete visitPayload[key];
          });
      const newVisit = await Visit.create(visitPayload);
      return res.status(201).json(newVisit);
    }
    catch (error) {
      console.error("CREATE VISIT FOR SUPPLIER ERROR:", error);
      return res.status(500).json({ message: "Error creating visit for supplier", error: error.message });
    }
}

module.exports = {
    getVisitToSupplier,
    createVisitToSupplier
};