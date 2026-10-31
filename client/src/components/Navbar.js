import React from 'react';

function Navbar() {

    const email =
        localStorage.getItem(
            'email'
        );

    const logout = () => {

        localStorage.removeItem(
            'token'
        );

        localStorage.removeItem(
            'email'
        );

        window.location.href = '/';

    };

    return (

        <nav
            className="
        navbar
        navbar-expand-lg
        navbar-dark
        bg-dark
        shadow-sm
        px-4
        py-3
        sticky-top
      "
            style={{
                zIndex: 1000
            }}
        >

            <div
                className="
          container-fluid
        "
            >

                {/* LEFT SIDE */}

                <div
                    className="
            d-flex
            align-items-center
            gap-4
          "
                >

                    {/* LOGO */}

                    <a
                        className="
              navbar-brand
              fw-bold
              fs-4
            "
                        href="/dashboard"
                    >

                        PriceTracker

                    </a>

                    {/* WAITING */}

                    <a
                        href="#waiting"
                        className="
              nav-link
              text-light
            "
                    >

                        Waiting Products

                    </a>

                    {/* NOTIFIED */}

                    <a
                        href="#notified"
                        className="
              nav-link
              text-light
            "
                    >

                        Notified Products

                    </a>

                </div>

                {/* RIGHT SIDE */}

                <div
                    className="
            d-flex
            align-items-center
            gap-3
          "
                >

                    {/* EMAIL */}

                    <div
                        className="
              text-light
              small
            "
                    >

                        {email}

                    </div>

                    {/* LOGOUT */}

                    <button

                        className="
              btn
              btn-danger
              btn-sm
            "

                        onClick={logout}

                    >

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;