import { useEffect, useState } from 'react';
import {
    Table,
    Card,
    Spinner,
    Button,
    ButtonGroup
} from 'react-bootstrap';
import axios from 'axios';
const List = ({ employees, loading, fetchData, handleEdit }) => {
    const handleDelete = (id) => {
        axios.get(`https://api-csw.herokuapp.com/api/employee/delete/${id}`).then(res => {
            fetchData();
        }).catch(err => {
            console.log(err)
        })
    }
    const renderEmployees = () => {
        if (loading) {
            return (
                <tr>
                    <td colSpan={4} className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </td>
                </tr>
            )
        }
        if (employees.length <= 0) {
            return (
                <tr>
                    <td colSpan={4} className="text-center">Khong co gi!!!</td>
                </tr>
            )
        }
        return employees?.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.salary}</td>
                <td>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="danger" onClick={() => handleDelete(item.id)} size="sm">Delete</Button>
                        <Button variant="warning" onClick={() => handleEdit(item.id)} size="sm">Edit</Button>
                    </ButtonGroup>
                </td>
            </tr>
        ))
    }
    return (
        <> <Card>

            <Card.Body>
                <Card.Title>
                    List Employees
                </Card.Title>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fullname</th>
                            <th>Salary</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderEmployees()}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
        </>
    )
}

export default List
