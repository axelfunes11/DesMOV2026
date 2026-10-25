
'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.addColumn(
            'users',
            'profilePhotoData',
            {
                type: Sequelize.BLOB('long'),
                allowNull: true
            }
        );
    },

    async down(queryInterface) {

        await queryInterface.removeColumn(
            'users',
            'profilePhotoData'
        );
    }
};