import React from 'react'
import { Form, Jumbotron, Row, Col, Button, Container } from 'react-bootstrap'

export const OrganizationForm = ({
    switcherForm,
    handlerBack,
    handlerOnSubmit,
    handlerOnChange,
    handlerAddUser,
    handlerRemoveUser,
    frmData }) => {

    return (
        <Container>
            <Jumbotron className='add-form mt-3'>
                <h1 className='text-info text-center'>{switcherForm} Organization</h1>
                <hr />
                <Form autoComplete='off' onSubmit={handlerOnSubmit}>
                    <Form.Group as={Row} >
                        <Form.Label column sm={3}>Name</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type='text'
                                name='name'
                                value={frmData.name}
                                onChange={handlerOnChange}
                                required
                            />
                        </Col>

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='textarea'
                            name='description'
                            row='5'
                            value={frmData.description}
                            onChange={handlerOnChange}
                            required

                        />
                    </Form.Group>
                    {frmData.users && frmData.users.map((user, index) =>
                        <div key={index}>
                            <Form.Group as={Row} >
                                <Form.Label column sm={3}>User name</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type='text'
                                        name={`user_name_${index}`}
                                        value={user.name}
                                        onChange={handlerOnChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={3}>User password</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type='text'
                                        name={`user_password_${index}`}
                                        value={user.password}
                                        onChange={handlerOnChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={3}>User Role</Form.Label>
                                <Col sm={6}>
                                    <Form.Control
                                        type='text'
                                        name={`user_role_${index}`}
                                        value={user.role}
                                        onChange={handlerOnChange}
                                        required
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Button type='submit' className='btn btn-danger' onClick={() => handlerRemoveUser(index)}><i className="fas fa-minus"></i></Button>
                                </Col>
                            </Form.Group>
                            <hr />
                        </div>)}
                    <div className="row text-right">
                        <div className='col-12 mr-12'>
                            <button type="button" onClick={handlerAddUser} className="btn btn-primary"><i className="fas fa-plus"></i></button>
                        </div>

                    </div>
                    <hr />
                    <Row>
                        <Col sm={3}>
                            <Button onClick={() => handlerBack('LIST')}><i className="fas fa-arrow-left"></i></Button>
                        </Col>
                        <Col sm={9} className='text-right'>
                            <Button type='submit' variant='info'>Save</Button>
                        </Col>
                    </Row>


                </Form>
            </Jumbotron>
        </Container>
    )
}

export default OrganizationForm