const getCategories = "SELECT category FROM products GROUP BY category";

module.exports = { getCategories };
