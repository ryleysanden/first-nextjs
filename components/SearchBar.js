import React, { useState, useEffect } from 'react';

export default function SearchBar() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
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

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for a product"
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center'
      }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #eaeaea',
            borderRadius: '10px',
            padding: '20px',
            width: '200px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{product.title}</h3>
            <img src={product.image} alt={product.title} style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              marginBottom: '10px'
            }} />
            <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
