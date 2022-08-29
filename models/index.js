// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category


// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
// Products belongToMany Tags (through ProductTag)
Category.belongsToMany(Product, {
  foreignKey: 'category_id',
});
// Tags belongToMany Products (through ProductTag)
tags  



module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
