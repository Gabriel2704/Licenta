import React, { Component } from 'react';
import CardExampleColored from '../components/Card';
import Navbar from '../components/Navbar';
import { getEvents } from '../axios/controllers';
import { singleEventsRoute } from '../axios/routes';

export default class events extends Component {

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            list: [],
            event: ""
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

    clickCard = async (id) => {
        this.props.history.push({
            state: { eventId: id },
            pathname: "/participants"
        });
    }

    clickButton = async (id) => {
        this.props.history.push({
            state: { eventId: id },
            pathname: "/details"
        });
    }

    render() {
        return (
            <div>
                <Navbar />
                <CardExampleColored evenimente={this.state.events} functieParticipanti={this.clickCard} functieDetalii={this.clickButton} />
            </div>
        )
    }
}
