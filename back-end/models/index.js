const db = require('../config/db');

const User = require('./user');
const Contestants = require('./contestants');
const SingleEvents = require('./single_events');
const Status = require('./status');
const TeamMembers = require('./team_members');
const Task = require('./task');

const Contestants_SingleEvents = require('./contestants_single_events');
const TeamMembers_SingleEvents = require('./team_members_single_events');
const Task_TeamMembers = require('./task_team_members');

Contestants.belongsToMany(SingleEvents, { onDelete: 'cascade', through: Contestants_SingleEvents});
SingleEvents.belongsToMany(Contestants, { onDelete: 'cascade', through: Contestants_SingleEvents });

Contestants.hasMany(Status, { foreignKey: 'contestantId' });
Status.belongsTo(Contestants, { foreignKey: 'contestantId' });

TeamMembers.belongsToMany(SingleEvents, { onDelete: 'cascade', through: TeamMembers_SingleEvents});
SingleEvents.belongsToMany(TeamMembers, { onDelete: 'cascade', through: TeamMembers_SingleEvents });

TeamMembers.belongsToMany(Task, { onDelete: 'cascade', through: Task_TeamMembers});
Task.belongsToMany(TeamMembers, { onDelete: 'cascade', through: Task_TeamMembers });

module.exports = {
    User,
    Contestants,
    SingleEvents,
    Contestants_SingleEvents,
    Status,
    TeamMembers,
    TeamMembers_SingleEvents,
    Task,
    Task_TeamMembers,
    connection: db
}
