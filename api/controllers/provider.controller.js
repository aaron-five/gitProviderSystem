const models = require("../database/models");

module.exports = {
  //Get all the Providers

  getProviders: async (req, res) => {
    try {
      const provider = await models.provider.findAll();
      res.json(provider);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Get one Provider by id
  getProvider: async (req, res) => {
    try {
      const { id } = req.params;
      const provider = await models.provider.findOne({
        where: {
          id,
        },
      });
      if (!provider) {
        return res.status(404).json({ message: "Provider does not exists" });
      }
      res.json(provider);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Create a new Provider
  createProvider: async (req, res) => {
    try {
      const { name, phone } = req.body;

      const newProvider = await models.provider.create({
        name,
        phone,
      });
      res.json(newProvider);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Update a Provider
  updateProvider: async (req, res) => {
    try {
      const { id } = req.params;

      const provider = await models.provider.findByPk(id);

      provider.set(req.body);
      console.log(provider);
      await provider.save();

      return res.json(provider);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Delete using a logical variable
  deleteProvider: async (req, res) => {
    try {
      const { id } = req.params;

      const provider = await models.provider.findByPk(id);
      provider.isDelete = true;
      await provider.save();

      res.json(provider);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
