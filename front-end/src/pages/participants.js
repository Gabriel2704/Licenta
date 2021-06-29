import React, { Component } from 'react';
import Table from '../components/Table';
import Navbar from '../components/Navbar';
import { get, getStatuses } from '../axios/controllers';
import { contestantRoute, statusRoute } from '../axios/routes';

export default class participants extends Component {

    constructor(props) {
        super(props);

        this.state = {
            event: "",
            participants: [],
            participant: {
                id: '',
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                facebook: '',
                cv: '',
                status: '',
                color: '',
                text: ''
            },
            data: [],
            statuses: []
        };
    };

    async componentDidMount() {
        try {
            let aux = await get(contestantRoute, this.props.location.state.eventId);
            this.setState({
                participants: aux,
            });
            this.setState({
                event: this.props.location.state.eventId,
            });

            let sts = await getStatuses(statusRoute);
            this.setState({
                statuses: sts,
            });

            for (let i = 0; i < this.state.participants.length; i++) {
                let auxId = this.state.participants[i].id;
                let auxFirstname = this.state.participants[i].firstname;
                let auxLastname = this.state.participants[i].lastname;
                let auxEmail = this.state.participants[i].email;
                let auxPhone = this.state.participants[i].phone;
                let auxFacebook = this.state.participants[i].facebook;
                let auxCv = this.state.participants[i].cv;

                for (let j = 0; j < this.state.statuses.length; j++) {
                    let auxStatus = this.state.statuses[j];

                    if (auxStatus.contestantId === this.state.participants[i].id) {
                        let auxColor;
                        let auxText;

                        if (auxStatus.status === false) {
                            auxColor = 'red';
                            auxText = 'Check-in'
                        } else {
                            auxColor = 'green';
                            auxText = 'Arrived'
                        }
                        this.setState({
                            participant: {
                                id: auxId,
                                firstname: auxFirstname,
                                lastname: auxLastname,
                                email: auxEmail,
                                phone: auxPhone,
                                facebook: auxFacebook,
                                cv: auxCv,
                                status: auxStatus.status,
                                color: auxColor,
                                text: auxText
                            }
                        });

                        this.setState({ data: this.state.data.concat(this.state.participant) });
                    }
                }    
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
                <Table participanti={this.state.participants} eveniment={this.state.event} date={this.state.data} />
            </div>
        )
    }
}
