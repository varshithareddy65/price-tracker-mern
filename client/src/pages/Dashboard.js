import React, {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import Navbar from '../components/Navbar';

import ProductCard
  from '../components/ProductCard';

import ProductModal
  from '../components/ProductModal';

import {
  toast
} from 'react-toastify';

function Dashboard() {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState('');

  const [darkMode, setDarkMode] =
    useState(false);

  const [title, setTitle] =
    useState('');

  const [url, setUrl] =
    useState('');

  const [targetPrice,
    setTargetPrice] =
    useState('');

  const [editId, setEditId] =
    useState(null);

  const [
    selectedProduct,

    setSelectedProduct

  ] = useState(null);

  const config = {

    headers: {

      authorization:
        localStorage.getItem('token')

    }

  };

  const fetchProducts = async () => {

    try {

      const res = await axios.get(

        'http://localhost:5000/api/products',

        config

      );

      setProducts(res.data);

    }

    catch (error) {

      toast.error(
        'Failed to load products'
      );

    }

  };

  useEffect(() => {

    fetchProducts();

    const interval = setInterval(() => {

      fetchProducts();

    }, 10000);

    return () => clearInterval(interval);

  }, []);

  const addProduct = async () => {

    try {

      // DUPLICATE CHECK

      const exists = products.some(

        (p) =>

          p.url === url

          &&

          p._id !== editId

      );

      if (exists) {

        toast.error(
          'Product already exists'
        );

        return;

      }

      // UPDATE

      if (editId) {

        await axios.put(

          `http://localhost:5000/api/products/${editId}`,

          {
            title,
            url,
            targetPrice
          },

          config

        );

        toast.success(
          'Product Updated'
        );

        setEditId(null);

      }

      // ADD

      else {

        await axios.post(

          'http://localhost:5000/api/products/add',

          {
            title,
            url,
            targetPrice,
            email:
              localStorage.getItem(
                'email'
              )
          },

          config

        );

        toast.success(
          'Product Added'
        );

      }

      setTitle('');

      setUrl('');

      setTargetPrice('');

      fetchProducts();

    }

    catch (error) {

      toast.error(
        'Something went wrong'
      );

    }

  };

  const deleteProduct =
    async (id) => {

      try {

        await axios.delete(

          `http://localhost:5000/api/products/${id}`,

          config

        );

        toast.success(
          'Product Deleted'
        );

        fetchProducts();

      }

      catch (error) {

        toast.error(
          'Delete Failed'
        );

      }

    };

  const filteredProducts =

    [...products]

      .reverse()

      .filter((p) =>

        p.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      );

  const waitingProducts =

    filteredProducts.filter(
      (p) => !p.alertSent
    );

  const notifiedProducts =

    filteredProducts.filter(
      (p) => p.alertSent
    );

  return (

    <div
      style={{

        background:
          darkMode
            ? '#121212'
            : '#f8f9fa',

        minHeight: '100vh',

        color:
          darkMode
            ? 'white'
            : 'black'

      }}
    >

      <Navbar />

      {/* PLACEHOLDER STYLE */}

      <style>

        {`

          .dark-input::placeholder {

            color: #ccc !important;

            opacity: 1;

          }

        `}

      </style>

      <div className="container mt-4">

        {/* SEARCH */}

        <div
          className="
            d-flex
            justify-content-between
            align-items-center
            mb-4
          "
        >

          <input
            type="text"
            className={`
              form-control
              w-50
              ${darkMode
                ? 'dark-input'
                : ''
              }
            `}
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{

              background:
                darkMode
                  ? '#1e1e1e'
                  : 'white',

              color:
                darkMode
                  ? 'white'
                  : 'black',

              border:
                darkMode
                  ? '1px solid #444'
                  : ''

            }}
          />

          <button
            className="
              btn
              btn-dark
            "
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
          >

            {

              darkMode
                ? 'Light Mode'
                : 'Dark Mode'

            }

          </button>

        </div>

        {/* FORM */}

        <div
          className="
            card
            shadow
            p-4
            mb-5
          "
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

          <h4 className="mb-4">

            {

              editId
                ? 'Edit Product'
                : 'Add Product'

            }

          </h4>

          <div className="row g-3">

            {/* TITLE */}

            <div className="col-md-3">

              <input
                type="text"
                className={`
                  form-control
                  ${darkMode
                    ? 'dark-input'
                    : ''
                  }
                `}
                placeholder="Product Name"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                style={{

                  background:
                    darkMode
                      ? '#1e1e1e'
                      : 'white',

                  color:
                    darkMode
                      ? 'white'
                      : 'black',

                  border:
                    darkMode
                      ? '1px solid #444'
                      : ''

                }}
              />

            </div>

            {/* URL */}

            <div className="col-md-5">

              <input
                type="text"
                className={`
                  form-control
                  ${darkMode
                    ? 'dark-input'
                    : ''
                  }
                `}
                placeholder="Amazon Product URL"
                value={url}
                onChange={(e) =>
                  setUrl(
                    e.target.value
                  )
                }
                style={{

                  background:
                    darkMode
                      ? '#1e1e1e'
                      : 'white',

                  color:
                    darkMode
                      ? 'white'
                      : 'black',

                  border:
                    darkMode
                      ? '1px solid #444'
                      : ''

                }}
              />

            </div>

            {/* TARGET */}

            <div className="col-md-2">

              <input
                type="number"
                className={`
                  form-control
                  ${darkMode
                    ? 'dark-input'
                    : ''
                  }
                `}
                placeholder="Target Price"
                value={targetPrice}
                onChange={(e) =>
                  setTargetPrice(
                    e.target.value
                  )
                }
                style={{

                  background:
                    darkMode
                      ? '#1e1e1e'
                      : 'white',

                  color:
                    darkMode
                      ? 'white'
                      : 'black',

                  border:
                    darkMode
                      ? '1px solid #444'
                      : ''

                }}
              />

            </div>

            {/* BUTTON */}

            <div className="col-md-2">

              <button
                className={`
                  btn
                  ${editId
                    ? 'btn-warning'
                    : 'btn-success'
                  }
                  w-100
                `}
                onClick={addProduct}
              >

                {

                  editId
                    ? 'Update'
                    : 'Add'

                }

              </button>

            </div>

          </div>

        </div>

        {/* WAITING */}

        <div
          className="mb-5"
          id="waiting"
        >

          <h3 className="mb-4">

            Waiting Products

          </h3>

          <div className="row">

            {

              waitingProducts.map((p) => (

                <div
                  className="
                    col-md-4
                    mb-4
                  "
                  key={p._id}
                >

                  <ProductCard

                    product={p}

                    darkMode={darkMode}

                    onView={
                      setSelectedProduct
                    }

                    onDelete={
                      deleteProduct
                    }

                  />

                </div>

              ))

            }

          </div>

        </div>

        {/* NOTIFIED */}

        <div
          className="mb-5"
          id="notified"
        >

          <h3 className="mb-4">

            Notified Products

          </h3>

          <div className="row">

            {

              notifiedProducts.map((p) => (

                <div
                  className="
                    col-md-4
                    mb-4
                  "
                  key={p._id}
                >

                  <ProductCard

                    product={p}

                    darkMode={darkMode}

                    onView={
                      setSelectedProduct
                    }

                    onDelete={
                      deleteProduct
                    }

                  />

                </div>

              ))

            }

          </div>

        </div>

      </div>

      <ProductModal

        product={selectedProduct}

        darkMode={darkMode}

        onClose={() =>
          setSelectedProduct(null)
        }

        onEdit={(product) => {

          setTitle(product.title);

          setUrl(product.url);

          setTargetPrice(
            product.targetPrice
          );

          setEditId(product._id);

          setSelectedProduct(null);

        }}

      />

    </div>

  );

}

export default Dashboard;