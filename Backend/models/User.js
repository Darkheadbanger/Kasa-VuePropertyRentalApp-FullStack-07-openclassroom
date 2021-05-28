module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {// Ici création de la clé primaire qui sert à identifié de manière unique
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: DataTypes.STRING,
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