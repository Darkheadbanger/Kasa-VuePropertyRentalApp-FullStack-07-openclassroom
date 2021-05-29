module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        createdAt: {
            //Type: DataTypes.DATETIME,
            type: 'TIMESTAMP',
            defaultValue: DataTypes.NOW,
            field: "Created_at",
        },
        updateAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
            field: "Update_at",
        },
    },
        {
            freezeTableName: true,
        }
    );
        return User;
}