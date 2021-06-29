import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import ChartRegistration from '../components/ChartRegistration';
import { getEvents, getStatuses } from '../axios/controllers';
import { singleEventsRoute, statusRoute } from '../axios/routes';
import "../css/admin.css";
import { get } from '../axios/controllers';
import { contestantRoute } from '../axios/routes';
import ChartParticipants from '../components/ChartParticipants';

export default class admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            list: [],
            event: "",
            participants: [],
            numbersParticipants: [],
            nrAux: [],
            data: [],
            statuses: [],
            bigData: [],
            nrParticipants: {}
        };
    };

    async componentDidMount() {
        try {
            let aux = await getEvents(singleEventsRoute);
            this.setState({
                events: aux,
            });

            for (let i = 0; i < this.state.events.length; i++) {
                this.state.participants[i] = await get(contestantRoute, this.state.events[i].id);
                this.state.nrAux[i] = this.state.participants[i].length;
            }
            this.setState({
                numbersParticipants: this.state.nrAux,
            });

            let sts = await getStatuses(statusRoute);
            this.setState({
                statuses: sts,
            });

            let k = 0;
            for (let i = 0; i < this.state.events.length; i++) {
                let auxNrParticipants = [];
                auxNrParticipants[i] = 0;
                
                for (let j = 0; j < this.state.participants[i].length; j++) {
                    let auxStatus = this.state.statuses[k].status;

                    if (auxStatus) {
                        auxNrParticipants[i]++;
                    }
                    
                    this.setState({
                        nrParticipants: auxNrParticipants[i]
                    });

                    this.setState({
                        data: this.state.nrParticipants
                    });

                    k++;
                }
                this.setState({
                    bigData: [...this.state.bigData, this.state.data]
                });

                this.setState({
                    data: []
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <img id='bg-chart' alt="logo" src={"../imgs/bg-chart.jpg"}></img>
                <div className='charts'>
                    <ChartRegistration id='chart' evenimente={this.state.events} nrParticipanti={this.state.numbersParticipants} />
                    <ChartParticipants id='chart' evenimente={this.state.events} nrParticipanti={this.state.bigData} />
                </div>
            </div>
        )
    }
}
