'use strict'

const awsServiceObj = require('../services/aws-services');
const uuidv4 = require('uuid/v4');

class ToDoListController {

  setup(router) {
    router.get('/api/tasks', this.getAllTask);
    router.post('/api/tasks', this.saveTask);
    router.put('/api/tasks', this.updateTask)
    router.delete('/api/tasks', this.deleteTask);
  }

  /* GET All Tasks. */
  getAllTask(req, res, next) {
    let awsService = new awsServiceObj('tasks');
    awsService.getAllItems(function(awsResponse) {
        let response = JSON.parse(awsResponse);
        res.send({ Items: response.body.Items });      
    });
  };

  /* POST new Tasks. */
  saveTask(req, res, next) {
    let newTask = req.body;
    if(newTask.hasOwnProperty('task_title') && newTask.hasOwnProperty('task_target') && newTask.hasOwnProperty('task_description')) {
      newTask.task_id = uuidv4();
      const newItem = { TableName : 'tasks', Item : newTask};

      const awsService = new awsServiceObj('tasks');
      awsService.setItem(newItem, function(awsResponse) {
          let response = JSON.parse(awsResponse);
          res.send({ Items: response });      
      });
    } else {
      res.status(403).send({message: 'Access forbidden for this action'});
    }
  };

  /* DELETE a Task. */
  deleteTask(req, res, next) {
    const task = req.body;
    if(task.hasOwnProperty('task_id')) {
      const awsService = new awsServiceObj('tasks');
      const taskObj = { TableName : 'tasks', Key : { task_id: task.task_id}};
      awsService.deleteItem(taskObj, function(awsResponse) {
          let response = JSON.parse(awsResponse);
          res.send({ Items: response });      
      });
    } else {
      res.status(403).send({message: 'Access forbidden for this action'});
    }
  };

   /* PUT a change of Task. */
  updateTask(req, res, next) {
    let task = req.body;
    if(task.hasOwnProperty('task_id')) {
      
      const taskItem = { 
        TableName : 'tasks', 
        Key: { task_id: task.task_id},
        UpdateExpression: "set task_title= :title, task_description= :desc, task_target= :target",
        ExpressionAttributeValues:{
            ":title": task.task_title,
            ":desc": task.task_description,
            ":target": task.task_target
        },
        ReturnValues: "NONE"
      };
      
      const awsService = new awsServiceObj('tasks');
      awsService.updateItem(taskItem, function(awsResponse) {
          let response = JSON.parse(awsResponse);
          res.send({ Items: response });      
      });
    } else {
      res.status(403).send({message: 'Access forbidden for this action'});
    }
  };

}


module.exports = new ToDoListController();