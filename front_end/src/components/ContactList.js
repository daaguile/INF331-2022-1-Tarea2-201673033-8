import React, { Component, Fragment } from "react";
import { Table } from 'reactstrap';

import NewContactModal from "./NewContactModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

export default class ContactList extends Component {
    render() {
        const contacts = this.props.contacts;
        return (
            <Fragment>
                <h1>Contactos</h1>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Primer Apellido</th>
                            <th>Segundo Apellido</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!contacts || contacts.length <= 0 ? (
                            <tr>
                                <td colSpan="6" align="center">
                                    <b>No hay contactos</b>
                                </td>
                            </tr>
                        ) : (
                            contacts.map(contact => (
                                <tr key={contact.id} id={contact.id}>
                                    <td>{contact.name}</td>
                                    <td>{contact.lastName}</td>
                                    <td>{contact.secondLastName}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <NewContactModal
                                            create={false}
                                            contact={contact}
                                            resetState={this.props.resetState}
                                        />
                                        &nbsp;&nbsp;
                                        <ConfirmRemovalModal
                                            id={contact.id}
                                            resetState={this.props.resetState}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}


// export default function Contacts() {
//     const [modal, setModal] = React.useState(false)
//     const toggle = () => setModal(!modal)
//     const navigate = useNavigate();
//     const handleDelete = () => {
//         toggle();
//         navigate("/");
//     }
//     return (
//         <div>
//             <h2>Contactos</h2>
//             <Table responsive striped >
//                 <thead>
//                     <tr>
//                         <th>
//                             #
//                         </th>
//                         <th>
//                             Nombre
//                         </th>
//                         <th>
//                             Primer Apellido
//                         </th>
//                         <th>
//                             Segundo Apellido
//                         </th>
//                         <th>
//                             Email
//                         </th>
//                         <th>
//                             Teléfono
//                         </th>
//                         <th>
//                             Actions
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <th scope="row">
//                             1
//                         </th>
//                         <td>
//                             Mark
//                         </td>
//                         <td>
//                             Otto
//                         </td>
//                         <td>
//                             Lotto
//                         </td>
//                         <td>
//                             ex@ex.ec
//                         </td>
//                         <td>
//                             +56 9 1122 3344
//                         </td>
//                         <td>
//                             <Button
//                                 color="warning"
//                                 to="/contact/edit" tag={Link}
//                             >
//                                 Editar
//                             </Button> | {" "}
//                             <Button
//                                 color="danger"
//                                 onClick={toggle}
//                             >
//                                 Eliminar
//                             </Button>
//                         </td>
//                     </tr>
//                     <tr>
//                         <th scope="row">
//                             2
//                         </th>
//                         <td>
//                             Jacob
//                         </td>
//                         <td>
//                             Thornton
//                         </td>
//                         <td>
//                             Lotto
//                         </td>
//                         <td>
//                             ex@ex.ec
//                         </td>
//                         <td>
//                             +56 9 1122 3344
//                         </td>
//                         <td>
//                             <Button
//                                 color="warning"
//                                 onClick={toggle}
//                             >
//                                 Editar
//                             </Button> | {" "}
//                             <Button
//                                 color="danger"
//                             >
//                                 Eliminar
//                             </Button>
//                         </td>
//                     </tr>
//                     <tr>
//                         <th scope="row">
//                             3
//                         </th>
//                         <td>
//                             Larry
//                         </td>
//                         <td>
//                             the Bird
//                         </td>
//                         <td>
//                             Lotto
//                         </td>
//                         <td>
//                             ex@ex.ec
//                         </td>
//                         <td>
//                             +56 9 1122 3344
//                         </td>
//                         <td>
//                             <Button
//                                 color="warning"
//                                 onClick={toggle}
//                             >
//                                 Editar
//                             </Button> | {" "}
//                             <Button
//                                 color="danger"
//                             >
//                                 Eliminar
//                             </Button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </Table>
//             <Modal
//                 isOpen={modal}
//                 toggle={toggle}
//             >
//                 <ModalHeader toggle={toggle}>
//                     Eliminar Contacto
//                 </ModalHeader>
//                 <ModalBody>
//                     ¿Desea eliminar definitivamente el contacto?
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button
//                         color="danger"
//                         onClick={handleDelete}
//                     >
//                         Eliminar
//                     </Button>
//                     {' '}
//                     <Button onClick={toggle}>
//                         Cancelar
//                     </Button>
//                 </ModalFooter>
//             </Modal>
//         </div>
//     );
// }