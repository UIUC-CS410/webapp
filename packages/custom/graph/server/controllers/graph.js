var data = require('./result.js');


module.exports = {
  getResult: function(req, res) {
    res.status(200).json(data);
  }
};
