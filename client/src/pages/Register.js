import React, {
    useState
} from 'react';

import API from '../api/axios';

import {
    useNavigate
} from 'react-router-dom';

import {
    toast
} from 'react-toastify';

function Register() {

    const navigate =
        useNavigate();

    const [name, setName] =
        useState('');

    const [email, setEmail] =
        useState('');

    const [password,
        setPassword] =
        useState('');

    const [error, setError] =
        useState('');

    const handleRegister =
        async (e) => {

            e.preventDefault();

            try {
                API.post('/auth/register', {
                    name,
                    email,
                    password
                });

                toast.success(
                    'Registration Successful'
                );

                navigate('/');

            } catch (err) {

                setError(

                    err.response?.data?.message ||

                    'Registration Failed'

                );

                toast.error(
                    'Registration Failed'
                );

            }

        };

    return (

        <div
            className="
        min-vh-100
        bg-light
      "
        >

            {/* HEADER */}

            <nav
                className="
          navbar
          navbar-dark
          bg-dark
          shadow-sm
          px-4
          py-3
        "
            >

                <div className="container-fluid">

                    <span
                        className="
              navbar-brand
              fw-bold
              fs-4
            "
                    >

                        PriceTracker

                    </span>

                </div>

            </nav>

            {/* REGISTER SECTION */}

            <div
                className="
          d-flex
          justify-content-center
          align-items-center
        "
                style={{
                    minHeight: '85vh'
                }}
            >

                <div
                    className="
            card
            shadow
            p-4
          "
                    style={{
                        width: '400px',
                        borderRadius: '15px'
                    }}
                >

                    <h2
                        className="
              text-center
              mb-4
              fw-bold
            "
                    >

                        Register

                    </h2>

                    {error && (

                        <div
                            className="
                alert
                alert-danger
              "
                        >

                            {error}

                        </div>

                    )}

                    <form
                        onSubmit={
                            handleRegister
                        }
                    >

                        {/* NAME */}

                        <div className="mb-3">

                            <label
                                className="form-label"
                            >

                                Name

                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                        {/* EMAIL */}

                        <div className="mb-3">

                            <label
                                className="form-label"
                            >

                                Email

                            </label>

                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                        {/* PASSWORD */}

                        <div className="mb-3">

                            <label
                                className="form-label"
                            >

                                Password

                            </label>

                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                        {/* BUTTON */}

                        <button
                            type="submit"
                            className="
                btn
                btn-dark
                w-100
              "
                        >

                            Register

                        </button>

                    </form>

                    {/* LOGIN */}

                    <p
                        className="
              text-center
              mt-3
            "
                    >

                        Already have an account?

                        {' '}

                        <span
                            style={{
                                color: 'blue',
                                cursor: 'pointer'
                            }}
                            onClick={() =>
                                navigate('/')
                            }
                        >

                            Login

                        </span>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;