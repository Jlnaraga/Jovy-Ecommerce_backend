const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories  
  try {
    const categories = await Category.findAll({
      //Add Product as a second model to JOIN with
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err.message);
  }
})

router.get('/:id', async (req, res) => {
  // find one category by its `id` value  
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create(req.body);
      res.status(201).json(data);
      } 
      catch (err) { 
        res.status(400).json(err); 
      }
});  

router.put('/:id', async (req, res) => {
  try {

    await Category.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
    });

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
