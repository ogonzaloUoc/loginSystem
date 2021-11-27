module.exports = (req, res) => {
    if (req.session) {
        req.session.destroy(unableToDestroySession => {
        if (unableToDestroySession) {
          res.status(400).send('<p>Unable to log out</p>')
        } else {
          res.status(200).send('<p>Logout successful</p>')
        }
      });
    } else  {
        //res.status(400).send('<p>Unable to log out</p>')
        res.end()
    }
};