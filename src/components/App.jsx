import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList"


const App = () => {
    const [ name, setName ] = useState();
    const [number, setNumber ] = useState();
    const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        window.localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]); 
    
    const handleChange = (e) => {
        if (e.target.name==='name') {
            setName(prevState => e.target.value);
        };
        if (e.target.name==='number') {
            setNumber(prevState => e.target.value);
        }
        // this.setState({
        //     [e.target.name]: e.target.value
        // });
    };

    const isExistingContact = (name) => { 
        return contacts.some(contact => contact.name === name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isExistingContact(e.target.name.value)) {
            alert(`${e.target.name.value} is already in contacts.`);
        return
        };
        const contact = {
            id: nanoid(),
            name: e.target.name.value,
            number: e.target.number.value,
            isExist: true,
        }
        setContacts(prevState => ([...contacts,
                contact]
        ));
        
    }

    const handleSearch = (e) => {
        setFilter(e.target.value );
    };

    const filterContacts = () => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    }

    const deleteContact = (e) => {   
        console.log(e.target.parentNode.parentNode.firstElementChild.innerText);
        const name = e.target.parentNode.parentNode.firstElementChild.innerText;
        setContacts(prevState => (contacts.filter(contact => contact.name!== name)));
    }

    const filteredContacts = filterContacts();  
    
    return (
        <div>
            <h2>Phonebook</h2>
            <ContactForm
                name={name}
                number={number}
                change={handleChange}
                submit={handleSubmit}
            />
            
            <h3>Contacts</h3>
            <Filter filter={handleSearch} />
            <ContactList
                filteredContacts={filteredContacts}
                deleteContact={deleteContact}
            />   
        </div>
    );
}
 
export default App;
