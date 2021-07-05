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

        if (priority < 0 && priority > 5) {
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

    updateTask: async (req, res) => {
        const taskToBeSent = {
            description: req.body.description,
            priority: req.body.priority
        }

        let errors = [];

        if (taskToBeSent.description.length < 0) {
            errors.push({ msg: 'Descriere nu exista' });
        }

        if (taskToBeSent.priority < 0 && taskToBeSent.priority > 5) {
            errors.push({ msg: 'Prioritatea intre 1 si 5' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            try {
                await Task.update(taskToBeSent, {
                    where: { id: req.params.id },
                });
                res.status(200).send({ msg: 'Evenimentul a fost schimbat' });
            }

            catch (err) {
                res.status(500).send({ msg: 'Evenimentul nu exista' });
            }
        }
    },

    deleteTask: async (req, res) => {
        try {
            const task = await Task.findOne({ where: { id: req.params.id } });
            if (task) {
                await task.destroy();
                res.status(200).send({ msg: "Task-ul a fost sters" });
            }
            else {
                res.status(404).send({ msg: "Task-ul nu a fost gasit" });
            }
        }
        catch (err) {
            console.log(err);
        }
    },
}

module.exports = controller;