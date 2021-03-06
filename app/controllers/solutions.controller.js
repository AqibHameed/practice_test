const db = require("../models");
const User = db.user
const Solution = db.solution
exports.index = (req, res) => {
    // Find the user from the Database
    User.findOne({
      where: {
        id: req.userId
      }
    }).then(user => {
      if (user) {
            // Fetch solutions of the user
            user.getSolutions().then(solutions => {
                  res.status(200).send({
                      solutions: solutions
                  }); 
                })
                .catch(err => {
                  res.status(500).send({ message: err.message });
                });
      }else{
            res.status(400).send({
              message: "Failed! User is not exist!"
            });
            return;
      }
    });

  };

exports.create = (req, res) => {
   // intialize the Solution
  const solution = new Solution({
    name: req.body.name,
    userId: req.userId
  });
  //save the Solution to Database
  solution.save()
    .then(solution => {
       res.send({ message: "Solution was created successfully!",
                  data: solution
       }); 
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.show = (req, res) => {
    // find Solution on the basis of the Id
    Solution.findByPk(req.params.solutionId)
      .then(solution => {
            if(!solution) {
                return res.status(404).send({
                    message: "solution not found with id " + req.params.id
                });            
            }
            res.send(solution); 
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.update = (req, res) => {
    // update Solution on the basis of the Id
    if(!req.body.name) {
        return res.status(400).send({
            message: "Solution name can not be empty"
        });
    }
    Solution.update({ name: req.body.name },
      { where: {id: req.params.solutionId}
      })
      .then(function() {
              res.send({ message: "Solution was updated successfully!" });
      })
      .catch(err => {
          res.status(500).send({ message: err.message });
      });
    
  };
  exports.delete = (req, res) => {
    // delete Solution on the basis of the Id
    Solution.destroy({ 
      where: {
          id: req.params.solutionId
      }
    })
    .then(function() {
            res.send({ message: "Solution is deleted successfully!" });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
  };
