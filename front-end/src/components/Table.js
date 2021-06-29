import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Icon, Table, Modal } from 'semantic-ui-react';
import { utilsRoute, contestantRoute, statusRoute } from '../axios/routes';
import { getStatus, postContestant, updateStatus } from '../axios/controllers';
import '../css/table.css';

const TableExampleApprove = ({ participanti, eveniment, date }) => {

    const [open, setOpen] = useState(false);
    const { register, handleSubmit } = useForm();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [facebook, setFacebook] = useState('');

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("pdf", data.pdf[0]);

        const res = await fetch(utilsRoute + "/uploadPdf", {
            method: "POST",
            body: formData
        }).then(res => res.json());

        try {
            let split = res.url.split("/");
            let link = "/" + split[3] + "/" + split[4];
            await postContestant(contestantRoute, { firstname: firstname, lastname: lastname, email: email, phone: phone, facebook: facebook, cv: link, idEv: eveniment });
        } catch (error) {
            console.log(error);
        }

        setOpen(false);
    }

    return (<Table compact celled className="table">
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Facebook</Table.HeaderCell>
                <Table.HeaderCell>CV</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {date.map((index, key) => (<Table.Row key={key}>
                <Table.Cell>{index.firstname + ' ' + index.lastname}</Table.Cell>
                <Table.Cell>{index.email}</Table.Cell>
                <Table.Cell>{index.phone}</Table.Cell>
                <Table.Cell>{index.facebook}</Table.Cell>
                <Table.Cell><a href={index.cv} download><Button icon='download' /></a></Table.Cell>
                <Table.Cell>
                    <Button color={index.color} onClick={async (ev) => {
                        let participantStatus = await getStatus(statusRoute, index.id);

                        if (participantStatus.status === true) {
                            ev.target.style.backgroundColor = 'rgb(219,40,40)';
                            ev.target.innerText = "Check-in";
                            try {
                                updateStatus(statusRoute, { status: false }, participantStatus.id);
                            }
                            catch (err) {
                                console.log(err);
                            }
                        } else {
                            ev.target.style.backgroundColor = 'rgb(33,186,69)';
                            ev.target.innerText = "Arrived";
                            try {
                                updateStatus(statusRoute, { status: true }, participantStatus.id);
                            }
                            catch (err) {
                                console.log(err);
                            }
                        }
                    }}>
                        {index.text}
                    </Button>
                </Table.Cell>
            </Table.Row>))}
        </Table.Body>

        <Table.Footer fullWidth>
            <Table.Row>
                <Table.HeaderCell colSpan='6'>
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        size={'mini'}
                        trigger={
                            <Button
                                floated='right'
                                icon
                                labelPosition='left'
                                primary
                                size='small'>
                                <Icon name='user' /> Add User
                            </Button>}>
                        <Modal.Content>
                            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                                <label>Firstname</label>
                                <input type='tel' onChange={(e) => {
                                    setFirstname(e.target.value);
                                }}></input>

                                <label>Lastname</label>
                                <input type='tel' onChange={(e) => {
                                    setLastname(e.target.value);
                                }}></input>

                                <label>Email</label>
                                <input type='tel' onChange={(e) => {
                                    setEmail(e.target.value);
                                }}></input>

                                <label>Phone</label>
                                <input type='tel' onChange={(e) => {
                                    setPhone(e.target.value);
                                }}></input>

                                <label>Facebook</label>
                                <input type='tel' onChange={(e) => {
                                    setFacebook(e.target.value);
                                }}></input>

                                <input {...register('pdf')} type="file" name="pdf" accept="application/pdf" />

                                <Button primary>Submit</Button>
                            </form>
                        </Modal.Content>
                    </Modal>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    </Table>)
}

export default TableExampleApprove