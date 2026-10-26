'use strict';

module.exports = {

    async up(
        queryInterface,
        Sequelize
    ) {

        await queryInterface.createTable(
            'censos',
            {

                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },


                nombre: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },


                apellido: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },


                totalMiembros: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },


                cantidadTelevisiones: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },


                latitude: {
                    type: Sequelize.DECIMAL(10, 7),
                    allowNull: false
                },


                longitude: {
                    type: Sequelize.DECIMAL(10, 7),
                    allowNull: false
                },


                /*
                 * NORMAL:
                 * censo creado desde la app.
                 *
                 * MASSIVE:
                 * censo generado por carga masiva.
                 */
                tipoCarga: {
                    type: Sequelize.ENUM(
                        'NORMAL',
                        'MASSIVE'
                    ),
                    allowNull: false,
                    defaultValue: 'NORMAL'
                },


                /*
                 * Usuario que realizó el censo.
                 *
                 * Se deja nullable porque los registros
                 * generados mediante carga masiva
                 * pueden no pertenecer a un censista.
                 */
                createdBy: {
                    type: Sequelize.INTEGER,
                    allowNull: true,

                    references: {
                        model: 'users',
                        key: 'id'
                    },

                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },


                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue:
                        Sequelize.literal(
                            'CURRENT_TIMESTAMP'
                        )
                },


                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue:
                        Sequelize.literal(
                            'CURRENT_TIMESTAMP'
                        )
                }
            }
        );
    },


    async down(
        queryInterface
    ) {

        await queryInterface.dropTable(
            'censos'
        );


        /*
         * PostgreSQL crea automáticamente
         * este tipo ENUM.
         */
        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_censos_tipoCarga";'
        );
    }
};