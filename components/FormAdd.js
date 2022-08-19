import { useEffect, useState } from 'react'
import {
    Form,
    Button,
    Card,
    Spinner
} from 'react-bootstrap';
import axios from 'axios';
const FormAdd = ({ fetchData, isEdit, oldData, setIsEdit }) => {
    const [loading, setLoading] = useState(false);
    const [fullname, setFullName] = useState('')
    const [salary, setSalary] = useState(0);
    const [idSelected, setIdSelected] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(fullname == null || salary == 0 || salary == ""){
            alert("Please enter full information")
            return
        }
        setLoading(true)
        var body = JSON.stringify({
            "name": fullname,
            "salary": salary
        })
        var config = {
            method: 'post',
            url: 'https://api-csw.herokuapp.com/api/employee/save',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };
        await axios(config).then(res => {
            if (res.status == 200) {
                setLoading(false);
                fetchData();
                setFullName('');
                setSalary(0)
            }
        }).catch(err => {
            setLoading(false)
        })
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true)
        var body = JSON.stringify({
            "name": fullname,
            "salary": salary
        })
        var config = {
            method: 'post',
            url: `https://api-csw.herokuapp.com/api/employee/update/${idSelected}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };
        await axios(config).then(res => {
            if (res.status == 200) {
                setLoading(false);
                fetchData();
                setFullName('');
                setSalary(0)
                setIsEdit(false);
            }
        }).catch(err => {
            setLoading(false)
        })
    }
    useEffect(() => {
        if (isEdit) {
            setFullName(oldData.name);
            setSalary(oldData.salary);
            setIdSelected(oldData.id);
        }
    }, [isEdit, oldData])
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {isEdit ? "Edit Employee" : "Add Employee"}
                    </Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Fullname</Form.Label>
                            <Form.Control required value={fullname} onChange={value => setFullName(value.target.value)} type="text" placeholder="Fullname employee" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control required value={salary} min={0} onChange={value => setSalary(value.target.value)} type="number" placeholder="Salary" />
                        </Form.Group>
                        <Button disabled={loading} onClick={isEdit ? handleUpdate : handleSubmit} variant={isEdit ? "warning" : "primary"} type="submit">
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="mr-2"
                                    />
                                    Loading...
                                </>
                            ) : (!isEdit ? "Add Employee" : "Edit")}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default FormAdd