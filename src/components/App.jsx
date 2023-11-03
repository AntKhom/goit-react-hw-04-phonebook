import React, { Component } from "react";
import { nanoid } from "nanoid";

import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList"


export class App extends Component {
    state = {
        contacts: [],
        filter: '',

        
    }

    componentDidMount() {
        console.log('DM');
        const myContacts = localStorage.getItem('myContacts');
        const parsedMyContacts = JSON.parse(myContacts);
        if (parsedMyContacts) {
            this.setState({contacts: parsedMyContacts});
        };
    };
    
    componentDidUpdate(prevProps, prevState) {
        console.log('DU');
        if (prevState.contacts !== this.state.contacts) {
            localStorage.setItem('myContacts', JSON.stringify(this.state.contacts));
        }
        
    };
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    isExistingContact = (name) => { 
        return this.state.contacts.some(contact => contact.name === name);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.isExistingContact(e.target.name.value)) {
            alert(`${this.state.name} is already in contacts.`);
        return
        };
        const contact = {
            id: nanoid(),
            name: this.state.name,
            number: this.state.number,
            isExist: true,
        }
        this.setState(prevState => ({
            contacts: [...prevState.contacts,
                contact],
            name: '',
            number: '',
        }));
        
    }

    handleSearch = (e) => {
        this.setState({ filter: e.target.value });
    };

    filterContacts = () => {
        return this.state.contacts.filter(contact =>
            contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
        );
    }

    deleteContact = (e) => {   
        console.log(e.target.parentNode.parentNode.firstElementChild.innerText);
        const name = e.target.parentNode.parentNode.firstElementChild.innerText;
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.name!== name)
        }));
    }

    render() {
        const filteredContacts = this.filterContacts();  
    
        return (
            <div>
                <h2>Phonebook</h2>
                <ContactForm
                    name={this.state.name}
                    number={this.state.number}
                    change={this.handleChange}
                    submit={this.handleSubmit}
                />
                
                <h3>Contacts</h3>
                <Filter filter={this.handleSearch} />
                <ContactList
                    filteredContacts={filteredContacts}
                    deleteContact={this.deleteContact}
                />   
            </div>
        );
    }
 }
