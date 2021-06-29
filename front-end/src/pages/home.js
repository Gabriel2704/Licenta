import React, { Component } from 'react';
import { get } from '../axios/controllers';
import { userRoute } from '../axios/routes';
import Navbar from '../components/Navbar';

export default class user extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account: [],
        };
    };

    async componentDidMount() {
        try {
            let aux = await get(userRoute, this.props.location.state.account.id);
            this.setState({
                account: aux,
            });
        }
        catch (err) {
        }
    }

    render() {
        return (
            <div>
                <Navbar />
                <img id='welcome' alt="logo" src={"../imgs/welcome.png"}></img>
            </div>
        )
    }
}
