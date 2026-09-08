"use strict";

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.addColumn(
            "users",
            "lastName",
            {
                type: Sequelize.STRING(100),
                allowNull: true
            }
        );

        await queryInterface.addColumn(
            "users",
            "username",
            {
                type: Sequelize.STRING(50),
                allowNull: true,
                unique: true
            }
        );

        await queryInterface.addColumn(
            "users",
            "age",
            {
                type: Sequelize.INTEGER,
                allowNull: true
            }
        );

        await queryInterface.addColumn(
            "users",
            "gender",
            {
                type: Sequelize.STRING(30),
                allowNull: true
            }
        );

        await queryInterface.addColumn(
            "users",
            "city",
            {
                type: Sequelize.STRING(100),
                allowNull: true
            }
        );

        await queryInterface.addColumn(
            "users",
            "phone",
            {
                type: Sequelize.STRING(30),
                allowNull: true
            }
        );

        await queryInterface.addColumn(
            "users",
            "profilePhoto",
            {
                type: Sequelize.STRING(500),
                allowNull: true
            }
        );
    },

    async down(queryInterface) {

        await queryInterface.removeColumn(
            "users",
            "profilePhoto"
        );

        await queryInterface.removeColumn(
            "users",
            "phone"
        );

        await queryInterface.removeColumn(
            "users",
            "city"
        );

        await queryInterface.removeColumn(
            "users",
            "gender"
        );

        await queryInterface.removeColumn(
            "users",
            "age"
        );

        await queryInterface.removeColumn(
            "users",
            "username"
        );

        await queryInterface.removeColumn(
            "users",
            "lastName"
        );
    }
};