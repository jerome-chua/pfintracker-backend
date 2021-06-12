export default function initExpenseModel(sequelize, DataTypes) {
  return sequelize.define(
    'expense',
    {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        references: {
          model: 'users',
          key: 'id',
        },
        type: DataTypes.INTEGER,
      },
      expenseType: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
      currency: {
        type: DataTypes.STRING,
      },
      note: {
        type: DataTypes.STRING,
      },
      hashtag: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    { 
      // underscored option makes Sequelize reference snake_case names in DB
      underscored : true
    },
  )
}