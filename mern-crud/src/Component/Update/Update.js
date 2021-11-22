// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';

// const Update = () => {
//     const { id } = useParams();
//     const [user, setUser] = useState({});

//     useEffect(() => {
//         const url = `http://localhost:5000/users/${id}`;
//         fetch(url)
//             .then(res => res.json())
//             .then(data => setUser(data))
//             .catch(error => { console.error('Error:', error) });
//     }, [id]);

//     // UPDATE AN USER
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [img, setImg] = useState(null);
//     const [address, setAddress] = useState('');
//     const [updateUser, setUpdateUser] = useState({});

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('phone', phone);
//     formData.append('img', img);
//     formData.append('address', address);

//     const handleUpdate = e => {

//         const url = `http://localhost:5000/users/${id}`;
//         fetch(url, {
//             method: 'PUT',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(updateUser)
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.modifiedCount > 0) {
//                     setUpdateUser({});
//                     e.target.reset();
//                 }
//             })
//         e.preventDefault();
//     }
//     return (
//         <div>
//             <div className="p-3 border bg-light">
//                 <h1>INSERT INFORMATION</h1>
//                 <form onSubmit={handleUpdate}>
//                     <div className="input-group mb-3">
//                         <span className="input-group-text fw-bold">Name</span>
//                         <input onChange={e => setName(e.target.value)} type="text" className="form-control" value={user.name || ''} />
//                     </div>
//                     <div className="input-group mb-3">
//                         <span className="input-group-text fw-bold">Email</span>
//                         <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" value={user.email || ''} />
//                     </div>
//                     <div className="input-group mb-3">
//                         <span className="input-group-text fw-bold">Phone</span>
//                         <input onChange={e => setPhone(e.target.value)} type="number" className="form-control" value={user.phone || ''} />
//                     </div>
//                     <div className="input-group mb-3">
//                         <span className="input-group-text fw-bold">Image</span>
//                         <input onChange={e => setImg(e.target.files[0])} type="file" className="form-control" value={user.img || ''} />
//                     </div>
//                     <div className="input-group mb-3">
//                         <span className="input-group-text fw-bold">Address</span>
//                         <textarea onChange={e => setAddress(e.target.value)} type="text" className="form-control" value={user.address || ''}/>
//                     </div>
//                     <button type="submit" className="btn btn-dark text-white fw-bold">INSERT</button>
//                 </form>

//                 {/* {
//                     message && <p className="alert alert-success fw-bold" role="alert">{message}</p>
//                 } */}
//             </div>
//         </div>
//     );
// };

// export default Update;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateEvent = () => {
    const [blog, setBlog] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const url = `https://fast-dusk-28001.herokuapp.com/event/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setBlog(data));
    }, [id]);

    const titleChange = e => {
        const updateTitle = e.target.value;
        const updateBlog = { ...blog };
        updateBlog.title = updateTitle;
        setBlog(updateBlog);
    }
    const addressChange = e => {
        const updateAddress = e.target.value;
        const updateBlog = { ...blog };
        updateBlog.address = updateAddress;
        setBlog(updateBlog);
    }
    const imgChange = e => {
        const updateImg = e.target.value;
        const updateBlog = { ...blog };
        updateBlog.img = updateImg;
        setBlog(updateBlog);
    }
    const descriptionChange = e => {
        const updateDescription = e.target.value;
        const updateBlog = { ...blog };
        updateBlog.description = updateDescription;
        setBlog(updateBlog);
    }

    const handleUpdateBlog = e => {
        const url = `https://fast-dusk-28001.herokuapp.com/event/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(blog)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Update Successful');
                    setBlog({});
                    e.target.reset();
                }
            })
        e.preventDefault();
    }

    return (
        <div className="container my-5 shadow p-3">
            <h1 className="text-center fw-bold mb-5">UPDATE BLOG</h1>
            <div className="d-flex justify-content-center align-items-center">
                <form onSubmit={handleUpdateBlog} className="container w-50">
                    <div className="row my-2">
                        <div className="input-group">
                            <div className="input-group-text fw-bold"><i className="fas fa-heading"></i></div>
                            <input type="text" className="form-control" id="autoSizingInputGroup" onChange={titleChange} value={blog.title || ''} />
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="input-group">
                            <div className="input-group-text fw-bold"><i className="fas fa-image"></i></div>
                            <input type="text" className="form-control" id="autoSizingInputGroup" onChange={imgChange} value={blog.img || ''} />
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="input-group">
                            <div className="input-group-text fw-bold"><i className="fas fa-map-pin"></i></div>
                            <input type="text" className="form-control" id="autoSizingInputGroup" onChange={addressChange} value={blog.address || ''} />
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="input-group">
                            <div className="input-group-text fw-bold"><i className="fas fa-paragraph"></i></div>
                            <textarea type="password" className="form-control" id="autoSizingInputGroup" onChange={descriptionChange} value={blog.description || ''} />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-dark fw-bold">UPDATE BLOG</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateEvent;