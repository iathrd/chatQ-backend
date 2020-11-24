'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('Messages','senderMessage',{
        type:Sequelize.STRING
      });
      await queryInterface.addColumn('Messages', 'sendMessage',{
        type:Sequelize.BOOLEAN
      })
      await queryInterface.addColumn('Messages','fistSender',{
        type: Sequelize.INTEGER
      })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },

  down: async (queryInterface, Sequelize) => {
   try {
     await queryInterface.removeColumn('Messages','senderMessage')
     await queryInterface.removeColumn('Messages','sendMessage')
     await queryInterface.removeColumn('Messages','firstSender')
     return Promise.resolve()
   } catch (error) {
     return Promise.reject(error)
   }
  }
};
