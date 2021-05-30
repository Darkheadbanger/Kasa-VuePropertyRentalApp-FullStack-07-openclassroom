module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user', {
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
        userName: {
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
    )
    return User
    // User.sync({force: true}).then(function () {
    //     // Table created
    //     return User.create({
    //       firstName: 'John',
    //       lastName: 'Hancock',
    //       username: "dada",
    //       email: "davidbouhaben@yahoo.co.id",
    //       password: "dada"
    //     });
    //   });
}