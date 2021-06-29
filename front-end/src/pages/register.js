import React, { Component } from 'react';
import '../css/entry.css';
import { post } from '../axios/controllers';
import { userRoute } from '../axios/routes';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                email: '',
                password: '',
                password2: ''
            },
        };
    }

    register = async () => {
        await post(userRoute + "/register", this.state.user).then(user => {
            if (user.msg === undefined) {
                user.msg = "User-ul a fost creat";
            } else {
                if (user.msg === "User-ul a fost creat") {
                    this.props.history.push('/');
                }
            }
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.register()

    };

    handleChange = (e) => {
        e.preventDefault();
        let newUser = this.state.user;
        newUser[e.target.name] = e.target.value;
        this.setState({ user: newUser });
    };

    render() {
        return (
            <div>
                <img alt="logo" src={'../imgs/entry-bg.png'}></img>
                <div className="entry-box">
                    <h1>Sign up</h1>
                    <div className="textbox">
                        <input type="email" placeholder="Username" name="name" onChange={this.handleChange} />
                    </div>

                    <div className="textbox">
                        <input type="email" placeholder="Email" name="email" onChange={this.handleChange} />
                    </div>

                    <div className="textbox">
                        <input type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                    </div>

                    <div className="textbox">
                        <input type="password" placeholder="Confirm password" name="password2" onChange={this.handleChange} />
                    </div>

                    <input className="btn" type="button" value="Submit" onClick={this.handleSubmit} />

                </div>
            </div>
        )
    }
}
