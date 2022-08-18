import { useState } from 'react'
import {
    Form,
    Button,
    Card,
    Spinner
} from 'react-bootstrap';
import axios from 'axios';
const FormAdd = ({fetchData}) => {
    const [loading, setLoading] = useState(false);
    const [fullname, setFullName] = useState('')
    const [salary, setSalary] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
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
            data : body
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
    return (
        <>
            <Card>
                <Card.Body>

                    <Card.Title>
                        Form Add
                    </Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required value={fullname} onChange={value => setFullName(value.target.value)} type="text" placeholder="Fullname employee" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control required value={salary} min={0} onChange={value => setSalary(value.target.value)} type="number" placeholder="Salary" />
                        </Form.Group>
                        <Button disabled={loading} onClick={handleSubmit} variant="primary" type="submit">
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
                            ):"Submit"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default FormAdd