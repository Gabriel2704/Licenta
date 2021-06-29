import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../css/card.css';

const CardExampleColored = ({ evenimente, functieParticipanti, functieDetalii }) => {
    return (<Card.Group className='cards'>
        {evenimente.map((index, key) => (
            <Card key={key} className='card' color='blue' onClick={async () => functieParticipanti(index.id)}>
                <img src={'../imgs/' + index.company + '.png'} alt={index.company}></img>
                <Button id='btn-details' inverted color='blue' onClick={async (e) => { e.stopPropagation(); functieDetalii(index.id); }}>
                    Details
                </Button>
            </Card>
        ))}
    </Card.Group>)
}

export default CardExampleColored