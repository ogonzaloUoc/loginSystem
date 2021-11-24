/* sessionOptions
Valores de configuración de nuestra cookie de sesión

Nota: En producción estas opciones deberían ser variables de entorno */

module.exports = sessionOptions = {
    name: "micookie",
    secret: "lascookiessonbuenas",
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false
  } 