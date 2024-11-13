import React, { useState, useEffect } from 'react';

export default function SearchBar() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
            setFilteredProducts(data);
          });
      }, []);

      const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        setFilteredProducts(
          products.filter((product) =>
            product.title.toLowerCase().includes(value.toLowerCase())
          )
        );
      };

      return (
        <div>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search for a product"
            style={{ marginBottom: '20px', padding: '10px', width: '80%' }}
          />
          <table border="1" style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>
                    <img src={product.image} alt={product.title} width="50" />
                  </td>
                  <td>${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
