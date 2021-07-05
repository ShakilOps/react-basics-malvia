import React, { Component } from 'react';

class EditContact extends Component {
    constructor(props) {
        super(props);
        const {id, name, email} = props.location.state.contact;
        this.state = {
            id,
            name,
            email,
        };
    }
    update = (e) => {
        e.preventDefault();
        if(this.state.name === '' || this.state.email === ''){
            alert('All the fields are mandatory')
            return;
        }
        this.props.updateContactHandler(this.state);
        this.setState({name : '', email : ''});
        //console.log(this.state); 
        this.props.history.push('/');
    }    
    render() {
        return (
            <div className = 'ui main'>
                <h2>Edit Contact</h2>
                <form className = 'ui form' onSubmit = {this.update}>
                    <div className = 'field'>
                        <label htmlFor="">Name</label>
                        <input type="text" name='name' placeholder='Name' 
                        value = {this.state.name}
                        onChange = {(e) => this.setState({name: e.target.value})} />
                    </div>
                    <div className = 'field'>
                        <label htmlFor="">Email</label>
                        <input type="text" name='name' placeholder='Email'
                        value = {this.state.email}
                        onChange = {(e) => this.setState({email: e.target.value})} />
                    </div>
                    <button className = 'ui blue'>update</button>
                </form>
            </div>
        );
    }
}

export default EditContact;

//in es6 if key and value are same then we can eliminate this 
// previously it was like that {id: id,name: name,email: email,}