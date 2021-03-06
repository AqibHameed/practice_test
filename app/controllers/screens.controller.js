const db = require("../models");
const Solution = db.solution
const Screen = db.screen
exports.index = (req, res) => {
    // Find solution by Id
    Solution.findByPk(req.solutionId)
      .then(solution => {

        if (solution) {
                // Fetch screens of the solution
                solution.getScreens()
                .then(screens => {
                  res.status(200).send({
                      screens: screens
                  }); 
                })
                .catch(err => {
                  res.status(500).send({ message: err.message });
                });
        }else{
              res.status(400).send({
                message: "Failed! soultion not found with id!"
              });
              return;
        }
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });

  };

exports.create = (req, res) => {
  // intialize the Screen
  const screen = new Screen({
    name: req.body.name,
    solutionId: req.body.solutionId
    //solutionId: req.solutionId
  });
  //save the Screen to Database
  screen.save()
    .then(screen => {
       res.send({ message: "Screen is created successfully!",
                  data: screen
       }); 
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.show = (req, res) => {
    // find Screen on the basis of the Id
    Screen.findByPk(req.params.screenId)
      .then(screen => {
            if(!screen) {
                return res.status(404).send({
                    message: "screen not found with id " + req.params.screenId
                });            
            }
            res.send(screen); 
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.update = (req, res) => {
    // update Screen on the basis of the Id
    if(!req.body.name) {
        return res.status(400).send({
            message: "Screen name can not be empty"
        });
    }
    Screen.update({ name: req.body.name },
      { where: {id: req.params.screenId}
      })
      .then(function() {
              res.send({ message: "Screen is updated successfully!" });
      })
      .catch(err => {
          res.status(500).send({ message: err.message });
      });
    
  };
  exports.delete = (req, res) => {
    // delete Screen on the basis of the Id
    Screen.destroy({ 
      where: {
          id: req.params.screenId
      }
    })
    .then(function() {
            res.send({ message: "Screen is deleted successfully!" });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
  };
