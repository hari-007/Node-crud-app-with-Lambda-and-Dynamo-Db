'use strict'

const awsServiceObj = require('../services/aws-services');
const uuidv4 = require('uuid/v4');

class ToDoListController {

  setup(router) {
    router.get('/api/tasks', this.getAllTask);
    router.put('/api/tasks', this.saveTask);
    router.post('/api/tasks', this.updateTask)
    router.delete('/api/tasks', this.deleteTask);
  }

  /* GET All Tasks. */
  getAllTask(req, res, next) {
    let awsService = new awsServiceObj('tasks');
    awsService.getAllItems(function(awsSignInObj) {
        let response = JSON.parse(awsSignInObj);
        res.send({ Items: response.body.Items });      
    });
  };

  /* PUT new Tasks. */
  saveTask(req, res, next) {
    let newTask = req.body; console.log(newTask);
    if(newTask.hasOwnProperty('task_title') && newTask.hasOwnProperty('task_target') && newTask.hasOwnProperty('task_description')) {
      newTask.task_id = uuidv4();
      const newItem = { TableName : 'tasks', Item : newTask};

      let awsService = new awsServiceObj('tasks');
      awsService.setItem(newItem, function(awsSignInObj) {
          let response = JSON.parse(awsSignInObj);
          res.send({ Items: response });      
      });
    } else {
      res.status(403).send({message: 'Access forbidden for this action'});
    }
     
    res.send({ message: 'Save a task route' });
  };

  /* DELETE a Task. */
  deleteTask(req, res, next) {
    res.send({ message: 'Delete a task' });
  };

   /* POST a change of Task. */
  updateTask(req, res, next) {
    res.send({ message: 'Delete a task' });
  };

}


module.exports = new ToDoListController();