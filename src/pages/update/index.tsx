import React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import userService from '../../services/userService';
import './style.css';

function Update() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState('');

    const { id }: any = useParams();

    const updatingUser = async () => {
        try {
            const data = await userService.updateUser(id, {
                name,
                phoneNumber,
                email,
                hobbies,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="update">
            <div className="update__container">
                <h1>Update User</h1>

                <form>
                    <h5>Name</h5>
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        required
                        onChange={e => setName(e.target.value)}
                    />
                    <h5>Phone Number</h5>
                    <input
                        type="number"
                        value={phoneNumber}
                        placeholder="Phone Number"
                        required
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                    <h5>Email</h5>
                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        required
                        onChange={e => setEmail(e.target.value)}
                    />

                    <h5>Hobbies</h5>
                    <input
                        type="text"
                        value={hobbies}
                        placeholder="Hobbies"
                        required
                        onChange={e => setHobbies(e.target.value)}
                    />
                    <Link to="/home">
                        <button
                            onClick={updatingUser}
                            type="submit"
                            className="update__Button"
                        >
                            Update
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Update;
