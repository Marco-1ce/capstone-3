import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { Col, Row, Container} from 'react-bootstrap';


export default function UserData({ usersData, fetchData }) {

	const [users, setUsers] = useState([]);

	useEffect(() => {
		console.log("usersData type:", typeof usersData);
  console.log("usersData value:", usersData);
		setUsers(usersData);
	},[usersData]);

	return (

	<Container>
		<h1 className="text-center my-4">Admin Dashboard</h1>
			<Row>
				<Col>
					<Table striped bordered hover responsive>
					      <thead>
					        <tr className="text-center">
					          <th>ID</th>
					          <th>First Name</th>
					          <th>Last Name</th>
					          <th>Email</th>
					          <th>Mobile No</th>
					          <th>Address</th>
					          <th>Is Admin</th>
					          <th>Actions</th>
					        </tr>
					      </thead>
					      <tbody>
					        {users.map((user) => (
					          <tr key={user._id}>
					            <td>{user._id}</td>
					            <td>{user.firstName}</td>
					            <td>{user.lastName}</td>
					            <td>{user.email}</td>
					            <td>{user.mobileNo}</td>
					            <td>{user.address}</td>
					            <td className={user.isAdmin ? 'text-success' : 'text-danger'}>
					              {user.isAdmin ? 'Yes' : 'No'}
					            </td>
					            {/*<td><EditProduct product={product._id} fetchData={fetchData}/></td>
					            <td><ArchiveProduct productId={product._id} isActive={product.isActive} fetchData={fetchData}/></td>*/}
					          </tr>
					        ))}
					      </tbody>
					    </Table>
				</Col>
			</Row>
	</Container>

	)
} 	