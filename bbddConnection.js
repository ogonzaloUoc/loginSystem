const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'development';
const bbddConnectionHelper = require('./bbddConnectionHelper')[env];

const connection = bbddConnectionHelper.database.uri;

const bbddConnection = async () =>{
  if(connection === '') {
    console.log('\nNo se ha podido establecer conexion con la BBDD:'
    +'\n\tPor favor pido el archivo bbddConnectionHelper.js a los desarrolladores del proyecto.\n')
  } else {
    mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log('\nConexion establecida con la BBDD.\n')
      }).catch((err) => {
          console.error(err)
      })
  }
}

module.exports = bbddConnection