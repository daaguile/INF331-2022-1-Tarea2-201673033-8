import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, Alert } from "reactstrap";
import NewContactForm from "./NewContactForm";

export default class NewContactModal extends Component {
    state = {
        modal: false,
    };

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal,
        }));
    }

    render() {
        const create = this.props.create;

        let title = "Editar Contacto";
        let button = <Button onClick={this.toggle}>Editar Contacto</Button>;
        if (create) {
            title = "Crear Contacto";
            button = (
                <Button
                    color="primary"
                    className="float-right"
                    onClick={this.toggle}
                    style={{ minWidth: "200px" }}
                >
                    Agregar un contacto
                </Button>
            );
        }
        return (
            <Fragment>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

                    <ModalBody>
                        {title === "Crear Contacto" ? <Alert
                            color="info"
                        >
                            Todos los campos son obligatorios
                        </Alert> : null}
                        <NewContactForm
                            resetState={this.props.resetState}
                            toggle={this.toggle}
                            contact={this.props.contact}
                        />
                    </ModalBody>
                </Modal>
            </Fragment>
        )

    }
};