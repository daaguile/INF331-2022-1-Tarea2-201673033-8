import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import ContactList from "./ContactList";
import NewContactModal from "./NewContactModal";

import axios from "axios";

import { API_URL } from "../constants";

export default class Home extends Component {
    state = {
        contacts: []
    };

    componentDidMount() {
        this.resetState();
    }

    getContacts = () => {
        axios.get(API_URL).then(res => this.setState({ contacts: res.data }));
    };

    resetState = () => {
        this.getContacts();
    };

    render() {
        return (
            <Container style={{ marginTop: "20px" }}>
                <Row>
                    <Col>
                        <ContactList
                            contacts={this.state.contacts}
                            resetState={this.resetState}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <NewContactModal create={true} resetState={this.resetState} />
                    </Col>
                </Row>
            </Container>
        );
    }
}