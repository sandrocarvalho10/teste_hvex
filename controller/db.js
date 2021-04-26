const Sequelize = require('sequelize')
require('dotenv/config')

//Connect DB
const sequelize = new Sequelize(process.env.DB_NAME,'teste_hvex', process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
})

//Verify if DB exists or is OK
sequelize.authenticate()
.then(() => {
  console.log('Banco de dados conectado com sucesso!')
})
.catch((erro) => {
  console.log('Erro ao conectar: ' + erro)
})

sequelize.sync()


module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
