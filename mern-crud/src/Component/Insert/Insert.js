import React, { useState } from 'react';

const Insert = () => {

    const [message, setMessage] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [img, setImg] = useState(null);
    const [address, setAddress] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('img', img);
        formData.append('address', address);

        const url = 'http://localhost:5000/users'
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setMessage('User Insert Successfully');
                    e.target.reset();
                }
            })
            .catch(error => { console.error('Error:', error) });
    }

    return (
        <div>
            <div className="p-3 border bg-light" style={{ position: 'fixed' }}>
                <h1>INSERT INFORMATION</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text fw-bold">Name</span>
                        <input onChange={e => setName(e.target.value)} type="text" className="form-control" required />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text fw-bold">Email</span>
                        <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" required />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text fw-bold">Phone</span>
                        <input onChange={e => setPhone(e.target.value)} type="number" className="form-control" required />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text fw-bold">Image</span>
                        <input onChange={e => setImg(e.target.files[0])} type="file" className="form-control" required />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text fw-bold">Address</span>
                        <textarea onChange={e => setAddress(e.target.value)} type="text" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-dark text-white fw-bold">INSERT</button>
                </form>

                {
                    message && <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>{message}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Insert;