const Status = require('../models/status');

const controller = {
    getStatus: async (req, res) => {
        try {
            let status = await Status.findOne({ where: { contestantId: req.params.contestantId } })

            if (status) {
                res.status(200).send(status);
            } else {
                res.send({ msg: 'Nu exista statusul' });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },

    updateStatus: async (req, res) => {
        const statusToBeSent = {
            status: req.body.status,
        }
        console.log(statusToBeSent)
        try {
            await Status.update(statusToBeSent, {
                where: { id: req.params.id },
            });
            res.status(200).send({ msg: 'Statusul a fost schimbat' });
        }

        catch (err) {
            res.status(500).send({ msg: 'Concurentul nu exista' });
        }

    },

    getAll: async (req, res) => {
        try {
            let statuses = await Status.findAll();
            res.send(statuses)
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
}

module.exports = controller;