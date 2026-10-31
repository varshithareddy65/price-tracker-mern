import React from 'react';

function ProductCard({

    product,

    darkMode,

    onView,

    onDelete

}) {

    const formattedTitle =

        product.title
            ?.charAt(0)
            .toUpperCase()

        +

        product.title
            ?.slice(1);

    return (

        <div
            className="
        card
        shadow-sm
        h-100
        border-0
      "
            style={{

                borderRadius: '15px',

                background:

                    darkMode
                        ? '#1e1e1e'
                        : 'white',

                color:

                    darkMode
                        ? 'white'
                        : 'black',

                transition:
                    '0.3s ease'

            }}
        >

            {/* IMAGE */}

            <a
                href={product.url}
                target="_blank"
                rel="noreferrer"
            >

                <img

                    src={
                        product.image ||

                        'https://via.placeholder.com/300'
                    }

                    alt={formattedTitle}

                    onError={(e) => {

                        e.target.src =
                            'https://via.placeholder.com/300';

                    }}

                    style={{

                        height: '220px',

                        width: '100%',

                        objectFit: 'contain',

                        padding: '15px',

                        cursor: 'pointer'

                    }}

                />

            </a>

            <div className="card-body">

                {/* TITLE */}

                <h5
                    className="fw-bold"
                    style={{
                        minHeight: '60px'
                    }}
                >

                    {formattedTitle}

                </h5>

                {/* CURRENT PRICE */}

                <h6
                    className="
            fw-bold
            text-success
          "
                >

                    Current:
                    ₹ {product.currentPrice}

                </h6>

                {/* TARGET */}

                <p
                    className="mb-2"
                    style={{

                        color:

                            darkMode
                                ? '#ddd'
                                : '#555'

                    }}
                >

                    Target:
                    ₹ {product.targetPrice}

                </p>

                {/* STATUS */}

                <div className="mb-3">

                    {

                        product.alertSent

                            ?

                            <span
                                className="
                  badge
                  bg-primary
                  p-2
                "
                            >

                                Notified

                            </span>

                            :

                            <span
                                className="
                  badge
                  bg-warning
                  text-dark
                  p-2
                "
                            >

                                Waiting

                            </span>

                    }

                </div>

                {/* BUTTONS */}

                <div className="d-flex gap-2">

                    <button

                        className={`
              btn
              ${darkMode
                                ? 'btn-light'
                                : 'btn-dark'
                            }
              w-100
            `}

                        onClick={() =>
                            onView(product)
                        }

                    >

                        View Details

                    </button>

                    <button

                        className="
              btn
              btn-danger
            "

                        onClick={() =>
                            onDelete(product._id)
                        }

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProductCard;