import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import axios from 'axios';

import { API_URL } from '../constants';
import NewContactForm from './NewContactForm';
import ConfirmRemovalModal from './ConfirmRemovalModal';

Enzyme.configure({ adapter: new Adapter() });

let contactId

// Initialize database
beforeAll(async () => {

    // Create a new contact for editing and deleting
    const res = await axios.post(API_URL, {
        name: 'initialName',
        lastName: 'initialLastName',
        secondLastName: 'initialSecondLastName',
        email: 'initial@email.com',
        phone: '911111111'
    })

    contactId = res.data.id
})

// Clean database
afterAll(async () => {
    return await axios.get(`${API_URL}deleteAll`);
})

describe('App', () => {

    describe('Creates a new contact', () => {

        describe('Tests for success', () => {

            test('With valid data: normal values', async () => {
                const state = {
                    name: 'TestName',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastName',
                    email: 'test@test.com',
                    phone: '911223344'
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(true);
            });

            test('With valid data: max length values)', async () => {
                const state = {
                    name: 'LooooooongTeeeestNaaameee',
                    lastName: 'LooooongTeestLaaastNaamee',
                    secondLastName: 'LooongTestSecondLastNamee',
                    email: 'test@test.com',
                    phone: '911223344'
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(true);
            });

            test('With valid data: min length values', async () => {
                const state = {
                    name: 'N',
                    lastName: 'L',
                    secondLastName: 'S',
                    email: 't@t.co',
                    phone: '911223344'
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(true);
            });
        });

        describe('Tests for failure', () => {

            test('With invalid name: empty', async () => {
                const state = {
                    name: '',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastName',
                    email: 'test@test.com',
                    phone: '911223344'
                }

                // axios.post.mockResolvedValue({ status: 201 });
                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid last name: empty', async () => {
                const state = {
                    name: 'TestName',
                    lastName: '',
                    secondLastName: 'TestSecondLastName',
                    email: 'test@test.com',
                    phone: '911223344'
                }

                // axios.post.mockResolvedValue({ status: 201 });
                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid second last name: empty', async () => {
                const state = {
                    name: 'TestName',
                    lastName: 'TestLastName',
                    secondLastName: '',
                    email: 'test@test.com',
                    phone: '911223344'
                }

                // axios.post.mockResolvedValue({ status: 201 });
                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid email: empty', async () => {
                const state = {
                    name: 'TestName',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastName',
                    email: '',
                    phone: '911223344'
                }

                // axios.post.mockResolvedValue({ status: 201 });
                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid phone: empty', async () => {
                const state = {
                    name: 'TestName',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastName',
                    email: 'test@test.com',
                    phone: ''
                }

                // axios.post.mockResolvedValue({ status: 201 });
                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid name: over max length (26 chars)', async () => {
                const state = {
                    name: 'LooooooongTeeeestNaaameeee',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastName',
                    email: 'test@test.com',
                    phone: '911223344'
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid last name: over max length (26 chars)', async () => {
                const state = {
                    name: 'TestName',
                    lastName: 'LooooongTeestLaaastNaameee',
                    secondLastName: 'TestSecondLastName',
                    email: 'test@test.com',
                    phone: '911223344'
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid second last name: over max length (26 chars)', async () => {
                const state = {
                    name: 'TestName',
                    lastName: 'TestLastName',
                    secondLastName: 'LooongTestSecondLastNameee',
                    email: 'test@test.com',
                    phone: '911223344'
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid phone: length less than 9', async () => {
                const state = {
                    name: 'TestName',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastName',
                    email: 'test@test.com',
                    phone: '91234567'
                }

                // axios.post.mockResolvedValue({ status: 201 });
                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid phone: length more than 9', async () => {
                const state = {
                    name: 'TestName',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastName',
                    email: 'test@test.com',
                    phone: '9123456789'
                }

                // axios.post.mockResolvedValue({ status: 201 });
                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid name: includes non letter char', async () => {
                const state = {
                    name: 'Test2+',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastName',
                    email: 'test@test.com',
                    phone: '911223344'
                }

                // axios.post.mockResolvedValue({ status: 201 });
                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid last name: includes non letter char', async () => {
                const state = {
                    name: 'Test2',
                    lastName: 'TestLastName2_',
                    secondLastName: 'TestSecondLastName',
                    email: 'test@test.com',
                    phone: '911223344'
                }

                // axios.post.mockResolvedValue({ status: 201 });
                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid second last name: includes non letter char', async () => {
                const state = {
                    name: 'Test',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastName?-',
                    email: 'test@test.com',
                    phone: '911223344'
                }

                // axios.post.mockResolvedValue({ status: 201 });
                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid email: wrong format', async () => {
                const state = {
                    name: 'TestName',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastName',
                    email: 'test',
                    phone: '911223344'
                }

                // axios.post.mockResolvedValue({ status: 201 });
                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });

            test('With invalid phone: includes non number char', async () => {
                const state = {
                    name: 'TestName',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastName',
                    email: 'test@test.com',
                    phone: '912345678a'
                }

                // axios.post.mockResolvedValue({ status: 201 });
                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().createContact()).toBe(false);
            });
        })

    });

    describe('Edit an contact', () => {

        describe('Tests for success', () => {

            test('With valid data: normal values', async () => {
                const state = {
                    name: 'TestNameE',
                    lastName: 'TestLastNameE',
                    secondLastName: 'TestSecondLastNameE',
                    email: 'test2@test.com',
                    phone: '911223345',
                    id: contactId,
                }


                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(true);
            });

            test('With valid data: max length values)', async () => {
                const state = {
                    name: 'LooooooongTeeeestNaaameeE',
                    lastName: 'LooooongTeestLaaastNaameE',
                    secondLastName: 'LooongTestSecondLastNameE',
                    email: 'test2@test.com',
                    phone: '911223345',
                    id: contactId,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(true);
            });

            test('With valid data: min length values', async () => {

                const state = {
                    name: 'E',
                    lastName: 'E',
                    secondLastName: 'E',
                    email: 'e@t.co',
                    phone: '911223344',
                    id: contactId,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);
                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(true);
            });
        });

        describe('Tests for failure', () => {

            test('With invalid name: empty', async () => {
                const state = {
                    name: '',
                    lastName: 'TestLastNameE',
                    secondLastName: 'TestSecondLastNameE',
                    email: 'test2@test.com',
                    phone: '911223345',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid last name: empty', async () => {
                const state = {
                    name: 'TestNameE',
                    lastName: '',
                    secondLastName: 'TestSecondLastNameE',
                    email: 'test2@test.com',
                    phone: '911223345',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid second last name: empty', async () => {
                const state = {
                    name: 'TestNameE',
                    lastName: 'TestLastNameE',
                    secondLastName: '',
                    email: 'test2@test.com',
                    phone: '911223345',
                    id: 1
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid email: empty', async () => {
                const state = {
                    name: 'TestNameE',
                    lastName: 'TestLastNameE',
                    secondLastName: 'TestSecondLastNameE',
                    email: '',
                    phone: '911223345',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid phone: empty', async () => {
                const state = {
                    name: 'TestNameE',
                    lastName: 'TestLastNameE',
                    secondLastName: 'TestSecondLastNameE',
                    email: 'test2@test.com',
                    phone: '',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid name: over max length (26 chars)', async () => {
                const state = {
                    name: 'LooooooongTeeeestNaaameeeE',
                    lastName: 'TestLastNameE',
                    secondLastName: 'TestSecondLastNameE',
                    email: 'test2@test.com',
                    phone: '911223345',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid last name: over max length (26 chars)', async () => {

                const state = {
                    name: 'TestNameE',
                    lastName: 'LooooongTeestLaaastNaameeE',
                    secondLastName: 'TestSecondLastNameE',
                    email: 'test2@test.com',
                    phone: '911223345',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid second last name: over max length (26 chars)', async () => {

                const state = {
                    name: 'TestNameE',
                    lastName: 'TestLastName',
                    secondLastName: 'LooongTestSecondLastNameeE',
                    email: 'test2@test.com',
                    phone: '911223345',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid phone: length less than 9', async () => {
                const state = {
                    name: 'TestNameE',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastNameE',
                    email: 'test2@test.com',
                    phone: '91122334',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid phone: length more than 9', async () => {
                const state = {
                    name: 'TestNameE',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastNameE',
                    email: 'test2@test.com',
                    phone: '9112233445',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid name: includes non letter char', async () => {
                const state = {
                    name: 'TestNameE¡}',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastNameE',
                    email: 'test2@test.com',
                    phone: '911223344',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid last name: includes non letter char', async () => {
                const state = {
                    name: 'TestNameE',
                    lastName: 'TestLastNameE2?',
                    secondLastName: 'TestSecondLastNameE',
                    email: 'test2@test.com',
                    phone: '911223344',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid second last name: includes non letter char', async () => {
                const state = {
                    name: 'TestNameE}',
                    lastName: 'TestLastNameE',
                    secondLastName: 'TestSecondLastNameE?$',
                    email: 'test2@test.com',
                    phone: '911223344',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid email: wrong format', async () => {
                const state = {
                    name: 'TestNameE}',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastNameE',
                    email: 'test2@test',
                    phone: '911223344',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });

            test('With invalid phone: includes non number char', async () => {
                const state = {
                    name: 'TestNameE}',
                    lastName: 'TestLastName',
                    secondLastName: 'TestSecondLastNameE',
                    email: 'test2@test.com',
                    phone: '91122334T',
                    id: 1,
                }

                const modalComponent = shallow(
                    <NewContactForm
                        resetState={() => { }}
                        toggle={() => { }}
                        contact={state}
                    />);

                modalComponent.setState(state);

                expect(await modalComponent.instance().editContact()).toBe(false);
            });
        })

    });

    describe('Delete an contact', () => {
        test('With id', async () => {

            const modalDeleteComponent = shallow(
                <ConfirmRemovalModal
                    resetState={() => { }}
                />);
            expect(await modalDeleteComponent.instance().deleteContact(contactId)).toBe(true);
        });
    });


});