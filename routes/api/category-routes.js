const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories   

    Category.findAll({}, (err, categories) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: 'There was an error getting  the category listening  to your API. P'
      })
    }
  })
        });


router.get('/:id', (req, res) => {
  // find one category by its `id` value  
    
  // be sure to include its associated Products
  try {
    const libraryCardData = await LibraryCard.findByPk(req.params.id, {
      include: [{ model: Reader }],
    });

    if (!libraryCardData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }

    res.status(200).json(libraryCardData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', (req, res) => {
  // create a new category
  try {
    // Since the model will create a unique UUID value by default,    
    //we just need to provide the `id` of the Reader that will own this card
    const locationData = await LibraryCard.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }


});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const libraryCardData = await LibraryCard.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!libraryCardData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }

    res.status(200).json(libraryCardData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
