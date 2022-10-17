import { nanoid } from 'nanoid';
import { Component } from 'react';
import { FormStyled, Input, Label } from './Form.styled';
import { Button } from 'components/ContactList/ContactList.styled';

export default class Form extends Component {
    nameId = nanoid();
    numberId = nanoid();

    state = {
        name: '',
        number: '',
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };

    reset = () => {
        this.setState({ name: '', number: '' });
    };

    render() {
        const { name, number } = this.state;
        return (
            <FormStyled onSubmit={this.handleSubmit}>
                <Label htmlFor={this.nameId}>Name:</Label>
                <Input
                    type="text"
                    name="name"
                    id={this.nameId}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={name}
                    onChange={this.handleChange}
                />
                <Label htmlFor={this.numberId}>Number:</Label>
                <Input
                    type="tel"
                    name="number"
                    id={this.numberId}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={this.handleChange}
                />
                <Button type="submit">Add contact</Button>
            </FormStyled>
        );
    }
}