import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter, ModalBody } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

export default class ConfirmRemovalModal extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    deleteContact = async (id) => {

        try {
            const res = await axios.delete(`${API_URL}${id}`);
            if (res.status === 204) {
                this.props.resetState();
                this.toggle();
                return true;
            }
        } catch (error) {
            // console.log(res.data)
            return false;
        }

    };

    render() {
        return (
            <Fragment>
                <Button color="danger" onClick={() => this.toggle()}>
                    Eliminar
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Eliminar Contacto
                    </ModalHeader>
                    <ModalBody>
                        ¿Desea eliminar definitivamente el contacto?
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            type="button"
                            color="danger"
                            onClick={() => this.deleteContact(this.props.id)}
                        >
                            Sí
                        </Button>
                        <Button type="button" onClick={() => this.toggle()}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}