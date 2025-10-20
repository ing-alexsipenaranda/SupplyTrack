const Industry = require('../models/Industry');

async function getIndustries(req, res) {
  try {
    const industries = await Industry.findAll();
    return res.json(industries);
  } catch (error) {
    console.error("GET INDUSTRIES ERROR:", error);
    return res.status(500).json({ message: "Error retrieving industries", error: error.message });
  }
} 

async function createIndustry(req, res) {
  try {
    const { name, description, created_by } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "El campo 'name' es obligatorio." });
    }












    const industryPayload = { name, description, created_by };

    Object.keys(industryPayload).forEach(key => {
      if (industryPayload[key] === undefined) delete industryPayload[key];
    });
     const newIndustry = await Industry.create(industryPayload);
     return res.status(201).json(newIndustry)} catch (error) {
       console.error("CREATE INDUSTRY ERROR:", error);
       return res.status(500).json({ message: "Error creating industry", error: error.message });
     }
}
module.exports = {
  getIndustries,
  createIndustry
};
