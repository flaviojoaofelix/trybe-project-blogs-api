const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoriesTable = sequelize.define('PostCategory', {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false,
  });

  PostCategoriesTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategoriesTable,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategoriesTable,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'posts',
    });
  };

  return PostCategoriesTable;
};

module.exports = PostCategorySchema;
