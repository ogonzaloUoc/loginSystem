function logout_post(req, res) {
    if (req.session) {
        let user = req.session.user.username
        req.session.destroy(unableToDestroySession => {
        if (unableToDestroySession) {
          res.status(400).send('<p>Unable to log out</p>')
        } else {
          res.status(200).send('<p>Logout successful</p>')
          console.log(`\nEl usuario ${user} se ha desconectado\n`);
        }
      });
    } else  {
        res.end()
    }
}

module.exports = {
   logout_post
}