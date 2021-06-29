import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import EventsTable from '../components/EventsTable';
import { getEvents } from '../axios/controllers';
import { singleEventsRoute } from '../axios/routes';

export default class eventmanagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
        };
    };

    async componentDidMount() {
        try {
            let aux = await getEvents(singleEventsRoute);
            this.setState({
                events: aux,
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="dashboard">
                    <EventsTable evenimente={this.state.events} />
                </div>
            </div>
        )
    }
}
