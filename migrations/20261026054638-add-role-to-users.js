'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.addColumn(
            'users',
            'role',
            {
                type: Sequelize.ENUM(
                    'CENSISTA',
                    'ADMIN'
                ),

                allowNull: false,

                /*
                 * Como ya tenemos usuarios creados,
                 * necesitamos un valor por defecto
                 * para que la migración no falle.
                 */
                defaultValue: 'CENSISTA'
            }
        );
    },


    async down(queryInterface) {

        await queryInterface.removeColumn(
            'users',
            'role'
        );

        /*
         * PostgreSQL crea internamente
         * un tipo ENUM.
         *
         * Lo eliminamos si hacemos rollback.
         */
        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_users_role";'
        );
    }
};