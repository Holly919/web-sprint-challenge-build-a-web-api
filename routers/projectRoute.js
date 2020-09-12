const express = require('express');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();


router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json({ project })
        })
        .catch(err => {
            res.status(500).json({ Message: 'Could not retrieve projects' });
        });
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                Message: 'Error: ID not found'
            });
        });
});

router.post('/', (req, res) => {
    const postInfo = {...req.body, id: req.params.id }
    Projects.insert(postInfo)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            console.loge(err);
            res.status(500).json({
                message:'Could not create new project'
            });
        });
});

router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({
                message: 'Project not found'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'There was an error updating project'
        });
    });
});

router.delete('/:id',  (req, res) => {
    Projects.remove(req.params.id)
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
    Projects.findById(id)
      .then(projects => {
        if (projects) {
          req.projects = projects;
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