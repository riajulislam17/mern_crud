import React from 'react';
import Insert from '../Insert/Insert';
import Read from '../Read/Read';

const Home = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-dark mb-3">
                <div className="container-fluid">
                    <h1 className="navbar-brand text-white text-center">MERN CRUD</h1>
                </div>
            </nav>

            <main>
                <div className="container-fluid px-2">
                    <div className="row gx-2">
                        <div className="col-4 col-lg-4">
                            <Insert></Insert>
                        </div>
                        <div className="col-8 col-lg-8">
                            <Read></Read>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;