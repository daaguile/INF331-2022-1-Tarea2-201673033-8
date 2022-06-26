import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { API_URL } from '../constants';
import axios from 'axios';

export default class NewContactForm extends React.Component {


    state = {
        name: '',
        lastName: '',
        secondLastName: '',
        email: '',
        phone: '',
        validate: {
            nameState: '',
            lastNameState: '',
            secondLastNameState: '',
            emailState: '',
            phoneState: '',
        },
        formValid: false,
    }

    componentDidMount() {
        if (this.props.contact) {
            const { name, lastName, secondLastName, email, phone } = this.props.contact;
            const validate = {
                nameState: 'valid',
                lastNameState: 'valid',
                secondLastNameState: 'valid',
                emailState: 'valid',
                phoneState: 'valid',
            };
            const formValid = true;
            this.setState({ name, lastName, secondLastName, email, phone, validate, formValid });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    validateName(e, name) {
        const nameRegex = /^[a-zA-Z]{1,25}$/;
        const { validate } = this.state;

        if (nameRegex.test(e.target.value)) {
            if (name === 1) validate.nameState = 'valid';
            else if (name === 2) validate.lastNameState = 'valid';
            else if (name === 3) validate.secondLastNameState = 'valid';
        } else {
            if (name === 1) validate.nameState = 'invalid';
            else if (name === 2) validate.lastNameState = 'invalid';
            else if (name === 3) validate.secondLastNameState = 'invalid';
        }

        this.setState({ validate });
        this.validateForm();
    }

    validateEmail(e) {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const { validate } = this.state;

        if (emailRegex.test(e.target.value)) {
            validate.emailState = 'valid';
        } else {
            validate.emailState = 'invalid';
        }

        this.setState({ validate });
        this.validateForm();
    }

    validatePhone(e) {
        const phoneRegex = /^9[0-9]{8}$/;
        const { validate } = this.state;

        if (phoneRegex.test(e.target.value)) {
            validate.phoneState = 'valid';
        } else {
            validate.phoneState = 'invalid';
        }

        this.setState({ validate });
        this.validateForm();

    }

    validateForm() {
        this.setState({
            formValid:
                this.state.validate.nameState === 'valid' &&
                this.state.validate.lastNameState === 'valid' &&
                this.state.validate.secondLastNameState === 'valid' &&
                this.state.validate.emailState === 'valid' &&
                this.state.validate.phoneState === 'valid'
        });
    }


    createContact = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const res = await axios.post(API_URL, this.state)
            if (res.status === 201) {
                this.props.resetState();
                this.props.toggle();
                return true;
            }
            else {
                // console.log(res.data)
                return false;
            }
        } catch (error) {

            return false
        }
    };

    editContact = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            const res = await axios.put(`${API_URL}${this.props.contact.id}`, this.state)
            if (res.status === 200) {
                // console.log(res.data)
                this.props.resetState();
                this.props.toggle();
                return true;
            }
            else {
                console.log(res.data)
                return false;
            }
        } catch (error) {
            return false
        }
    };

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.contact ? this.editContact(e) : this.createContact(e);
        return true;
    }

    render() {
        return (
            <React.Fragment>
                <Form onSubmit={this.props.contact ? this.editContact : this.createContact}>
                    <FormGroup>
                        <Label for="name">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            onChange={(e) => {
                                this.validateName(e, 1);
                                this.onChange(e);
                            }}
                            type="text"
                            value={this.defaultIfEmpty(this.state.name)}
                            valid={this.state.validate.nameState === 'valid'}
                            invalid={this.state.validate.nameState === 'invalid'}
                        />
                        <FormFeedback>
                            El texto ingresado es inválido
                        </FormFeedback>
                        <FormFeedback valid>
                            Nombre ingresado correctamente
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastName">
                            Primer Apellido
                        </Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            onChange={(e) => {
                                this.validateName(e, 2);
                                this.onChange(e);
                            }}
                            type="text"
                            value={this.defaultIfEmpty(this.state.lastName)}
                            valid={this.state.validate.lastNameState === 'valid'}
                            invalid={this.state.validate.lastNameState === 'invalid'}
                        />
                        <FormFeedback>
                            El texto ingresado es inválido
                        </FormFeedback>
                        <FormFeedback valid>
                            Apellido ingresado correctamente
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="secondLastName">
                            Segundo Apellido
                        </Label>
                        <Input
                            id="secondLastName"
                            name="secondLastName"
                            onChange={(e) => {
                                this.validateName(e, 3);
                                this.onChange(e);
                            }}
                            type="text"
                            value={this.defaultIfEmpty(this.state.secondLastName)}
                            valid={this.state.validate.secondLastNameState === 'valid'}
                            invalid={this.state.validate.secondLastNameState === 'invalid'}
                        />
                        <FormFeedback>
                            El texto ingresado es inválido
                        </FormFeedback>
                        <FormFeedback valid>
                            Segundo Apellido ingresado correctamente
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            onChange={(e) => {
                                this.validateEmail(e);
                                this.onChange(e);
                            }}
                            placeholder="email@ejemplo.com"
                            type="email"
                            value={this.defaultIfEmpty(this.state.email)}
                            valid={this.state.validate.emailState === 'valid'}
                            invalid={this.state.validate.emailState === 'invalid'}
                        />
                        <FormFeedback>
                            Hay un problema con el email. Por favor ingrese un email correcto
                        </FormFeedback>
                        <FormFeedback valid>
                            Email ingresado correctamente
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                            Teléfono
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            onChange={(e) => {
                                this.validatePhone(e);
                                this.onChange(e);
                            }}
                            placeholder="Ej: 912345678"
                            type="text"
                            value={this.defaultIfEmpty(this.state.phone)}
                            valid={this.state.validate.phoneState === 'valid'}
                            invalid={this.state.validate.phoneState === 'invalid'}
                        />
                        <FormFeedback>
                            El teléfono ingresado es inválido
                        </FormFeedback>
                        <FormFeedback valid>
                            Teléfono ingresado correctamente
                        </FormFeedback>
                    </FormGroup>

                    <Button color='primary' disabled={!this.state.formValid}>
                        Enviar
                    </Button>
                </Form>
            </React.Fragment >
        );
    }

}