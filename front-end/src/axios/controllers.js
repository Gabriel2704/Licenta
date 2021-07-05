import axios from 'axios';

async function get(url, id) {
    try {
        let newUrl = !id ? url : url + "/" + id;
        return (await axios.get(newUrl, { withCredentials: true })).data;
    } catch (e) {
        return e;
    }
}

async function post(url, item) {
    try {
        return (await axios.post(
            url,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function getEvents(url) {
    try {
        return (await axios.get(url)).data;
    } catch (e) {
        return e.response.data;
    }
}

async function postContestant(url, item) {
    try {
        let newUrl = !item ? url : url + "/addContestant";
        return (await axios.post(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function postEvent(url, item) {
    try {
        let newUrl = !item ? url : url + "/addEvent";
        return (await axios.post(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function deleteEvent(url, id) {
    try {
        await axios.delete(url + "/deleteEvent/" + id);
    } catch (e) {
        return e.response.data;
    }
}

async function updateEvent(url, item, name) {
    try {
        let newUrl = !item ? url : url + "/updateEvent/" + name;
        return (await axios.put(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function getStatus(url, contestantId) {
    try {
        let newUrl = !contestantId ? url : url + "/" + contestantId;
        return (await axios.get(newUrl, { withCredentials: true })).data;
    } catch (e) {
        return e;
    }
}

async function updateStatus(url, item, id) {
    try {
        let newUrl = !item ? url : url + "/updateStatus/" + id;
        return (await axios.put(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function getStatuses(url) {
    try {
        return (await axios.get(url)).data;
    } catch (e) {
        return e.response.data;
    }
}

async function updateDescription(url, item, name) {
    try {
        let newUrl = !item ? url : url + "/updateDescription/" + name;
        return (await axios.put(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function postTask(url, item) {
    try {
        let newUrl = !item ? url : url + "/addTask";
        return (await axios.post(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function updateTask(url, item, id) {
    try {
        let newUrl = !item ? url : url + "/updateTask/" + id;
        return (await axios.put(
            newUrl,
            item,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).data;
    } catch (e) {
        return e.response.data;
    }
}

async function deleteTask(url, id) {
    try {
        await axios.delete(url + "/deleteTask/" + id);
    } catch (e) {
        return e.response.data;
    }
}

export {
    get, post, getEvents, postContestant, postEvent, deleteEvent, updateEvent,
    getStatus, updateStatus, getStatuses, updateDescription, postTask, updateTask, deleteTask
};