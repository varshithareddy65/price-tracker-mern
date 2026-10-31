import React from 'react';

import PriceChart
    from './PriceChart';

function ProductModal({

    product,

    darkMode,

    onClose,

    onEdit

}) {

    if (!product) return null;

    return (

        <div
            className="
        modal
        d-block
      "
            style={{
                background:
                    'rgba(0,0,0,0.6)'
            }}
        >

            <div
                className="
          modal-dialog
          modal-lg
        "
            >

                <div
                    className="modal-content"
                    style={{

                        background:

                            darkMode
                                ? '#1e1e1e'
                                : 'white',

                        color:

                            darkMode
                                ? 'white'
                                : 'black'

                    }}
                >

                    {/* HEADER */}

                    <div
                        className="modal-header"
                        style={{
                            borderBottom:

                                darkMode
                                    ? '1px solid #444'
                                    : ''
                        }}
                    >

                        <h5
                            className="modal-title"
                        >

                            Product Details

                        </h5>

                        <button

                            className={`
                btn-close
                ${darkMode
                                    ? 'btn-close-white'
                                    : ''
                                }
              `}

                            onClick={onClose}

                        />

                    </div>

                    {/* BODY */}

                    <div className="modal-body">

                        {/* IMAGE */}

                        <div className="text-center mb-4">

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

                                    alt={product.title}

                                    onError={(e) => {

                                        e.target.src =
                                            'https://via.placeholder.com/300';

                                    }}

                                    style={{

                                        height: '250px',

                                        maxWidth: '100%',

                                        objectFit: 'contain',

                                        cursor: 'pointer'

                                    }}

                                />

                            </a>

                        </div>

                        <hr
                            style={{
                                borderColor:

                                    darkMode
                                        ? '#444'
                                        : ''
                            }}
                        />

                        {/* DETAILS */}

                        <h4
                            className="fw-bold"
                        >

                            {product.title}

                        </h4>

                        <p>

                            <strong>
                                Current Price:
                            </strong>

                            {' '}

                            ₹ {product.currentPrice}

                        </p>

                        <p>

                            <strong>
                                Target Price:
                            </strong>

                            {' '}

                            ₹ {product.targetPrice}

                        </p>

                        <p>

                            <strong>
                                Added On:
                            </strong>

                            {' '}

                            {

                                new Date(
                                    product.createdAt
                                ).toLocaleString()

                            }

                        </p>

                        {/* STATUS */}

                        <p>

                            <strong>
                                Status:
                            </strong>

                            {' '}

                            {

                                product.alertSent

                                    ?

                                    <span
                                        className="
                      badge
                      bg-primary
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
                    "
                                    >

                                        Waiting

                                    </span>

                            }

                        </p>

                        {/* CHART */}

                        <div className="mt-4">

                            <h5 className="mb-3">

                                Price History

                            </h5>

                            <PriceChart

                                history={
                                    product.priceHistory
                                }

                                darkMode={darkMode}

                            />

                        </div>

                    </div>

                    {/* FOOTER */}

                    <div
                        className="modal-footer"
                        style={{
                            borderTop:

                                darkMode
                                    ? '1px solid #444'
                                    : ''
                        }}
                    >

                        {/* EDIT */}

                        <button

                            className="
                btn
                btn-warning
              "

                            onClick={() =>
                                onEdit(product)
                            }

                        >

                            Edit

                        </button>

                        {/* OPEN PRODUCT */}

                        <a

                            href={product.url}

                            target="_blank"

                            rel="noreferrer"

                            className="
                btn
                btn-primary
              "

                        >

                            Open Product

                        </a>

                        {/* CLOSE */}

                        <button

                            className={`
                btn
                ${darkMode
                                    ? 'btn-light'
                                    : 'btn-secondary'
                                }
              `}

                            onClick={onClose}

                        >

                            Close

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ProductModal;