const db = require('../config/db');

const User = require('./user');
const Contestants = require('./contestants');
const SingleEvents = require('./single_events');
const Status = require('./status');
const TeamMembers = require('./team_members');
const Task = require('./task');

const Contestants_SingleEvents = require('./contestants_single_events');
const TeamMembers_Task = require('./team_members_task');
const Task_SingleEvents = require('./task_single_events');

Contestants.belongsToMany(SingleEvents, { onDelete: 'cascade', through: Contestants_SingleEvents });
SingleEvents.belongsToMany(Contestants, { onDelete: 'cascade', through: Contestants_SingleEvents });

Contestants.hasMany(Status, { onDelete: 'cascade', foreignKey: 'contestantId' });
Status.belongsTo(Contestants, { onDelete: 'cascade', foreignKey: 'contestantId' });

TeamMembers.belongsToMany(Task, { onDelete: 'cascade', through: TeamMembers_Task });
Task.belongsToMany(TeamMembers, { onDelete: 'cascade', through: TeamMembers_Task });

SingleEvents.belongsToMany(Task, { onDelete: 'cascade', through: Task_SingleEvents });
Task.belongsToMany(SingleEvents, { onDelete: 'cascade', through: Task_SingleEvents });

module.exports = {
    User,
    Contestants,
    SingleEvents,
    Contestants_SingleEvents,
    Status,
    TeamMembers,
    TeamMembers_Task,
    Task,
    Task_SingleEvents,
    connection: db
}
