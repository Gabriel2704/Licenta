import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import "../css/details.css";
import { get, updateDescription } from '../axios/controllers';
import { singleEventsRoute, taskRoute } from '../axios/routes';
import TodoList from '../components/TodoList';

export default class details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: [],
            isInEditMode: false,
            value: 'Text',
            tasks: []
        }
    }

    async componentDidMount() {
        try {
            let aux = await get(singleEventsRoute, this.props.location.state.eventId);
            this.setState({
                event: aux,
            });

            let tsk = await get(taskRoute, this.props.location.state.eventId);
            this.setState({
                tasks: tsk,
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    changeDescription = async () => {
        try {
            await updateDescription(singleEventsRoute, { description: this.refs.theTextInput.value }, this.state.event.name);
        }
        catch (err) {
            console.log(err);
        }
    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    updateComponentValue = () => {
        this.setState({
            isInEditMode: false,
            value: this.refs.theTextInput.value
        })
        this.changeDescription();
        window.location.reload(false);
    }

    renderEditView = () => {
        return <div>
            <Navbar />
            <img id='bg-chart' alt="logo" src={"../imgs/bg-chart.jpg"}></img>
            <div id='title'>
                <h1>{this.state.event.company}</h1>
            </div>
            <div className='input-description'>
                <input type="text" id='input-description' defaultValue={this.state.event.description} ref='theTextInput' />
                <button id='btn-cancel' onClick={this.changeEditMode}>X</button>
                <button id='btn-ok' onClick={this.updateComponentValue}>OK</button>
            </div>
        </div>
    }

    renderDefaultView = () => {
        return <div>
            <Navbar />
            <img id='bg-chart' alt="logo" src={"../imgs/bg-chart.jpg"}></img>
            <div className='text-description'>
                <h1 id='title'>{this.state.event.company}</h1>
                <p id='description' onDoubleClick={this.changeEditMode}>{this.state.event.description}</p>
            </div>
            <div className='todo-app'>
                <TodoList eveniment={this.state.event} taskuri={this.state.tasks} />
            </div>
        </div>
    }

    render() {
        return this.state.isInEditMode ?
            this.renderEditView() : this.renderDefaultView()
    }
}
