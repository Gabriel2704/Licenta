const Contestants = require('../models/contestants');
const SingleEvents = require('../models/single_events');
const Contestants_single_events = require('../models/contestants_single_events');
const Status = require('../models/status');

const controller = {
    getContestants: async (req, res) => {
        try {
            let event = await SingleEvents.findOne({
                where: { id: req.params.id },
                include: [{
                    model: Contestants,
                    attributes: ['id'],
                }]
            })

            let contestants = [];
            event.contestants.forEach(contestant => {
                contestants.push(contestant.contestants_single_events.contestantId);
            });

            let table = await Contestants.findAll({
                where: {
                    id: contestants
                }
            })
            res.status(200).send(table);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },

    addContestant: async (req, res) => {
        const { firstname, lastname, email, phone, facebook, cv, idEv } = req.body;
        let errors = [];
        console.log(req.body);

        if (!firstname || !lastname || !email || !phone || !facebook || !cv) {
            errors.push({ msg: 'Introduceti toate campurile' });
        }

        if (firstname.length < 0) {
            errors.push({ msg: 'Prenumele trebuie sa aiba minim 6 caractere' });
        }

        if (lastname.length < 0) {
            errors.push({ msg: 'Numele trebuie sa aiba minim 6 caractere' });
        }

        if (!email.includes("@") || !email.includes(".")) {
            errors.push({ msg: 'Formatul email-ului e invalid' });
        }

        if (errors.length > 0) {
            res.send(errors);
        } else {
            try {
                Contestants.create({ firstname, lastname, email, phone, facebook, cv }).then(user => {
                    Contestants_single_events.create({ contestantId: user.id, singleEventId: idEv });
                    Status.create({ status: false, contestantId: user.id });
                });
            } catch (error) {
                res.send({ error });
            }
        }
    },
}

module.exports = controller;