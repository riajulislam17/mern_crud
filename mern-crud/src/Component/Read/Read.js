import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Read = () => {

    // READ USER
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const url = 'http://localhost:5000/users'
        fetch(url)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(error => { console.error('Error:', error) });
    }, [users]);


    // DELETE AN USER
    const [items, setItem] = useState([]);
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remainingUsers = items.filter(item => item._id !== id);
                        setItem(remainingUsers);
                    }
                }, [id]);
        }
    };


    // UPDATE AN USER
    const [updateUser, setUpdateUser] = useState({});

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [img, setImg] = useState(null);
    const [address, setAddress] = useState('');

    const handleUpdate = id => {
        const url = `http://localhost:5000/users/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setUpdateUser(data));
    };

    const { id } = useParams();
    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('img', img);
        formData.append('address', address);

        const url = `http://localhost:5000/users${id}`
        fetch(url, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    // setMessage('User Insert Successfully');
                    e.target.reset();
                }
            })
    }

    return (
        <div>
            <div className="p-3 border bg-light">
                <div className="row row-cols-1 row-cols-md-3 g-4">

                    {

                        users.map(user => <div className="col"
                            key={user._id}>
                            <div className="card h-100 p-2">
                                <img src={`data:image/*;base64,${user.img}`} className="card-img-top img-fluid" alt="..." style={{ height: '250px', width: '100%' }} />
                                <div className="card-body">
                                    <h5 className="card-title text-start"><span className="text-success fw-bold">Name: </span>{user.name}</h5>
                                    <h5 className="card-title text-start"><span className="text-success fw-bold">Email: </span>{user.email}</h5>
                                    <h5 className="card-title text-start"><span className="text-success fw-bold">Phone: </span>{user.phone}</h5>
                                    <h5 className="card-title text-start"><span className="text-success fw-bold">Address: </span>{user.address}</h5>
                                </div>
                                <div className="d-flex justify-content-between px-3">
                                    <button onClick={() => handleDelete(user._id)} type="button" className="btn btn-danger fw-bold">DELETE</button>
                                    <button onClick={() => handleUpdate(user._id)} type="button" className="btn btn-warning fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal">UPDATE</button>

                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">UPDATE USER</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text fw-bold">Name</span>
                                                            <input onChange={e => setName(e.target.value)} type="text" className="form-control" value={updateUser.name || ''} />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text fw-bold">Email</span>
                                                            <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" value={updateUser.email || ''} />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text fw-bold">Phone</span>
                                                            <input onChange={e => setPhone(e.target.value)} type="number" className="form-control" value={updateUser.phone || ''} />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text fw-bold">Image</span>
                                                            <input onChange={e => setImg(e.target.files[0])} type="file" className="form-control" value={updateUser.img || ''} />
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text fw-bold">Address</span>
                                                            <textarea onChange={e => setAddress(e.target.value)} type="text" className="form-control" placeholder={updateUser.address || ''} />
                                                        </div>

                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary">Save changes</button>
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }

                </div>
            </div>
        </div>
    );
};

export default Read;