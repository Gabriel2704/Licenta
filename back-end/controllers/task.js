const Task = require('../models/task');
const Task_single_events = require('../models/task_single_events');
const SingleEvents = require('../models/single_events');

const controller = {
    getTasks: async (req, res) => {
        try {
            let event = await SingleEvents.findOne({
                where: { id: req.params.id },
                include: [{
                    model: Task,
                    attributes: ['id'],
                }]
            })

            let tasks = [];
            event.tasks.forEach(task => {
                tasks.push(task.task_single_events.taskId);
            });
            console.log(tasks)
            let table = await Task.findAll({
                where: {
                    id: tasks
                }
            })
            res.status(200).send(table);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    addTask: async (req, res) => {
        const { description, priority, idEv } = req.body;
        let errors = [];
        console.log(req.body);

        if (!description || !priority) {
            errors.push({ msg: 'Introduceti toate campurile' });
        }

        if (description.length < 0) {
            errors.push({ msg: 'Descrierea nu exista' });
        }

        if (priority < 0 && priority > 6) {
            errors.push({ msg: 'Prioritatea intre 1 si 5' });
        }

        if (errors.length > 0) {
            console.log(errors);
            res.send(errors);
        } else {
            try {
                Task.create({ description, priority }).then(task => {
                    Task_single_events.create({ taskId: task.id, singleEventId: idEv });
                });
            } catch (error) {
                res.send({ error });
            }
        }
    },
}

module.exports = controller;