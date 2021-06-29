const SingleEvents = require('../models/single_events');

const controller = {
    getEvents: async (req, res) => {
        try {
            let events = await SingleEvents.findAll();
            res.send(events)
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    getEvent: async (req, res) => {
        try {
            let event = await SingleEvents.findOne({
                where: { id: req.params.id }
            });
            res.send(event)
        } catch (err) {
            res.status(500).send(err);
        }
    },

    addEvent: async (req, res) => {
        const { name, company } = req.body;
        let errors = [];


        if (!name || !company) {
            errors.push({ msg: 'Introduceti toate campurile' });
        }

        if (name.length < 0) {
            errors.push({ msg: 'Prenumele trebuie sa aiba minim 6 caractere' });
        }

        if (company.length < 0) {
            errors.push({ msg: 'Numele trebuie sa aiba minim 6 caractere' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            try {
                SingleEvents.create({ name, company, description: 'Add description' });
            } catch (error) {
                res.send({ error });
            }
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const event = await SingleEvents.findOne({ where: { id: req.params.id } });
            if (event) {
                await event.destroy();
                res.status(200).send({ msg: "Event-ul a fost sters" });
            }
            else {
                res.status(404).send({ msg: "Event-ul nu a fost gasit" });
            }
        }
        catch (err) {
            console.log(err);
        }
    },

    updateEvent: async (req, res) => {
        const eventToBeSent = {
            name: req.body.name,
            company: req.body.company
        }

        let errors = [];

        if (eventToBeSent.name.length < 0) {
            errors.push({ msg: 'Numele trebuie sa aiba minim 6 caractere' });
        }

        if (eventToBeSent.company.length < 0) {
            errors.push({ msg: 'Compania trebuie sa fie specificata' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            try {
                await SingleEvents.update(eventToBeSent, {
                    where: { name: req.params.name },
                });
                res.status(200).send({ msg: 'Evenimentul a fost schimbat' });
            }

            catch (err) {
                res.status(500).send({ msg: 'Evenimentul nu exista' });
            }
        }
    },

    updateDescription: async (req, res) => {
        const descriptionToBeSent = {
            description: req.body.description,
        }

        let errors = [];

        if (descriptionToBeSent.description.length < 0) {
            errors.push({ msg: 'Introduceti text!' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            try {
                await SingleEvents.update({ description: descriptionToBeSent.description }, {
                    where: { name: req.params.name }
                });
                res.status(200).send({ msg: 'Descrierea proiectului a fost schimbata' });
            }

            catch (err) {
                res.status(500).send({ msg: 'Evenimentul nu exista' });
            }
        }
    },
}

module.exports = controller;