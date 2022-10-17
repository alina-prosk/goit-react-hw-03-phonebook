import { Component } from 'react';
import PropTypes from 'prop-types';
import { Contact, Button, List } from './ContactList.styled';

export default class ContactList extends Component {
    render() {
        const { contacts, onDelete } = this.props;
        return (
            <List>
                {contacts.map(({ name, number, id }) => {
                    return (
                        <Contact key={id}>
                            <span>
                                {name}: {number}
                            </span>
                            <Button type="button" onClick={() => onDelete(id)}>
                                Delete
                            </Button>
                        </Contact>
                    );
                })}
            </List>
        );
    }
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};