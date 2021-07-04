import React from 'react';
import {Link} from 'react-router-dom';
import user from '../images/user.png';

const ContactCard = (props) => {
    const {id, name, email} = props.contact;
    return (
        <div>
            <div className = 'item'>
                <img className = 'ui avatar image' src={user} alt="" />
                <div className = 'content'>
                    <Link to = {{ pathname : `/contact/${id}`, state: { contact : props.contact } }}>
                        <div className = 'header'>{name}</div>
                        <div>{email}</div>
                    </Link>
                </div>
                <i className = 'trash alternate outline icon' 
                    style = {{color: 'red', marginTop: '7px'}}
                    onClick = {() => props.clickHandler(id)}
                ></i>
            </div>
        </div>
    );
};

export default ContactCard;

//we have to pass two things into the Link that's why create an object
//previously it was like that `/contact/${id}`