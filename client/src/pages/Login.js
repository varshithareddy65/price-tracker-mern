
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

function Login() {

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState('');

    const [password,
        setPassword] =
        useState('');

    const [error, setError] =
        useState('');

    const handleLogin =
        async (e) => {

            e.preventDefault();

            try {

                const res =
                    await API.post(
                        '/auth/login',

                        {
                            email,
                            password
                        }

                    );

                // SAVE TOKEN
                localStorage.setItem(

                    'token',

                    res.data.token

                );

                // SAVE EMAIL
                localStorage.setItem(

                    'email',

                    email

                );

                toast.success(
                    'Login Successful'
                );

                // REDIRECT
                window.location.href =
                    '/dashboard';

            } catch (err) {

                setError(

                    err.response?.data?.message ||

                    'Login Failed'

                );

                toast.error(
                    'Invalid Credentials'
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

            {/* LOGIN SECTION */}

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

                        Login

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
                        onSubmit={handleLogin}
                    >

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

                            Login

                        </button>

                    </form>

                    {/* REGISTER */}

                    <p
                        className="
              text-center
              mt-3
            "
                    >

                        Don’t have an account?

                        {' '}

                        <span
                            style={{
                                color: 'blue',
                                cursor: 'pointer'
                            }}
                            onClick={() =>
                                navigate('/register')
                            }
                        >

                            Register

                        </span>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;