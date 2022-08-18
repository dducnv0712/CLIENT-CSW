import { useEffect, useState } from 'react';
import {
    Table,
    Card,
    Spinner,
    Button 
} from 'react-bootstrap';
import axios from 'axios';
const List = ({employees,loading,fetchData}) => {
    const handleDelete = (id) =>{
        axios.get(`https://api-csw.herokuapp.com/api/employee/delete/${id}`).then(res=>{
            fetchData();
        }).catch(err =>{
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
                <td> <Button variant="danger" onClick={()=>handleDelete(item.id)}  size="sm">Delete</Button></td>
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
                            <th>First Name</th>
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
