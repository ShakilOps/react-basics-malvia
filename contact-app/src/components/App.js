import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import { uuid } from 'uuidv4';
import ContactDetail from './ContactDetail';
import api from '../api/contacts';

function App() {
  const LOCAL_STORAGE_KEY = 'contacts'
  const [contacts, setContacts] = useState([]);

  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };
  //retrieveContacts();

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  }
  
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(retrieveContacts) setContacts(retrieveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    }
    getAllContacts();
  },[]);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  },[contacts]);

  return (
    <div className = 'ui container'>
      <Router>
      <Header></Header>
      <Switch>
        <Route 
        exact path = "/" 
        render = {(props) => (<ContactList 
          {...props} 
          contacts = {contacts} 
          getContactId = {removeContactHandler}
          />
          )}
        // component ={() => (
        // <ContactList 
        //   contacts = {contacts} 
        //   getContactId = {removeContactHandler} />)}
        />
        <Route 
        path = "/add" 
        render = {(props) => (<AddContact 
          {...props} 
          addContactHandler = {addContactHandler}
          />
          )}
        // component ={(
        // <AddContact 
        // addContactHandler = {addContactHandler} />)} 
        />
        <Route path = '/contact/:id' component = {ContactDetail} />
      </Switch>
      {/* <AddContact 
          addContactHandler = {addContactHandler}
      ></AddContact>
      <ContactList 
          contacts = {contacts} 
          getContactId = {removeContactHandler}
      ></ContactList> */}
      </Router>
    </div>
  );
}

export default App; 

//for the performance issue we use render.props here instead of component 