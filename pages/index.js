import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Container
} from 'react-bootstrap';
import axios from 'axios';
import FormAdd from '../components/FormAdd';
import List from '../components/List';
export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false)
  const fetchData = async () => {
    setLoading(true);
    await axios.get("https://api-csw.herokuapp.com/api/employee/list").then(res => {
      setEmployees(res.data);
      setLoading(false)
    }).catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    fetchData();
  }, [])

  const findByID = async (id) => {
    await axios.get(`https://api-csw.herokuapp.com/api/employee/${id}`).then(res => {
      setEmployee(res.data)
      console.log(res.data)
      setIsEdit(true);
    }).catch(err => {
      console.log(err)
      setIsEdit(false);
    })
  }
  return (
    <>
      <Container className="py-4">
        <Row >
          <Col md={4}>
            <FormAdd fetchData={() => fetchData()} isEdit={isEdit} setIsEdit={value => setIsEdit(value)} oldData={employee} />
          </Col>
          <Col md={8}>
            <List employees={employees} loading={loading} fetchData={() => fetchData()} handleEdit={id => findByID(id)} />
          </Col>
        </Row>
      </Container>
    </>
  )
}
