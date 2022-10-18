import { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import Filter from './Filter/Filter';
import { AppStyled } from './App.styled';

export class App extends Component {
    state = {
        contacts: [ ],
        filter: '',
    };

    createNewContact = currentValue => {
        const alreadyAdded = this.state.contacts.some(
            obj => obj.name === currentValue.name
        );
        alreadyAdded
            ? alert(`${currentValue.name} is already in contacts`)
            : this.setState(prevState => {
                const newContact = {
                    name: currentValue.name,
                    id: nanoid(),
                    number: currentValue.number,
                };
                return { contacts: [...prevState.contacts, newContact] };
            });
    };

    deleteContact = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(
                contact => contact.id !== contactId
            ),
        }));
    };

    changeFilter = e => {
        this.setState({ filter: e.target.value });
    };

    componentDidMount() {
        console.log('App componentDidMount')

        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);

        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
    }

    componentDidUpdate(preveProps, prevState) {
        console.log('App componentDidUpdate')

        if (this.state.contacts !== prevState.contacts) {
            console.log('оновлення contacts');

            localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
        }
    };

    render() {
        console.log('App render')
        const normalizedFilter = this.state.filter.toLowerCase();
        const filtredContacts = this.state.contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
        );
        return (
            <AppStyled>
                <Section title="Phonebook">
                    <Form onSubmit={this.createNewContact} />
                </Section>
                <Section title="Contacts">
                    <Filter
                        value={this.state.filter}
                        onChange={this.changeFilter}
                    />
                    <ContactList
                        contacts={filtredContacts}
                        onDelete={this.deleteContact}
                    />
                </Section>
            </AppStyled>
        );
    }
}