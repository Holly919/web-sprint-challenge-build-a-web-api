const express = require('express')
const Actions = require('../data/helpers/actionModel')
const router = express.Router()


router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json({
            action
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Action not found'
        });
    });
});

router.get('/:id', validateId, (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(req.action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ 
                message: 'Error: ID not found' 
            })
        })
})

router.post('/', (req, res) => {
    const actionInfo = {...req.body, id: req.params.id};
    Actions.insert(actionInfo)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Could not add action'
        });
    });
});

router.put('/:id', validateId, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({
                message: 'Action not found'
            });
        };
    });
});

router.delete('/:id', validateId, (req, res) => {
    Actions.remove(req.params.id)
    .then(e => {
        if(e > 0){
            res.status(200).json({message: "The project has been deleted"})
        } else{ res.status(404).json({message: "The project could not be found"})}
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "Error deleteing project"})
    })
    
  });

  function validateId(req, res, next) {
    const { id } = req.params;
    Actions.findById(id)
      .then(actions => {
        if (actions) {
          req.actions = actions;
          next();
        } else {
          // res.status(404).json({ message: 'does not exist' });
          next(new Error('does not exist'));
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'exception', err });
      });
  }


module.exports = router;