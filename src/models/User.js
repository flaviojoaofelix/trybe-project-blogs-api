const UserSchema = (sequelize, DataTypes) => {
  const UsersTable = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  UsersTable.associate = (models) => {
    UsersTable.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'posts',
    })
  };

  return UsersTable;
};

module.exports = UserSchema;
