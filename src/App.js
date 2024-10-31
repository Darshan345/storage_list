import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    advice_no: '',
    line: '',
    item: '',
    description: '',
    warehouse: '',
    from_location: '',
    to_location: '',
    storage_unit: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //const response = await fetch('http://localhost:3001/api/method/pragati_test.api.form.submit_form', {
      const response = await fetch('/api/method/pragati_test.api.form.submit_form', {
 
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Frappe-API-Key': 'bc5ad7a9cac2790', 
          'X-Frappe-API-Secret': 'ebc7ace1787a906',
          //'Access-Control-Allow-Origin': '*', 
        },
        body: JSON.stringify({ data: formData })
      });

      const contentType = response.headers.get("content-type");
      console.log("Content-Type:", contentType);

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (response.ok) {
          setMessage('Data submitted successfully!');
          console.log("JSON Response:", result);
        } else {
          setMessage('Error submitting data: ' + result.message);
          console.error("Error in JSON Response:", result);
        }
      } else {
        const textResult = await response.text();
        setMessage(`Unexpected response format (not JSON): ${textResult}`);
        console.log("Full HTML Response:", textResult);
        console.error("Unexpected response:", textResult);
      }
    } catch (error) {
      setMessage('Error in API call: ' + error.message);
      console.error("API Call Error:", error);
    }
  };

  return (
    <div>
      <h1>Submit Form</h1>
      <form onSubmit={handleSubmit}>
        <input name="advice_no" placeholder="Advice No" value={formData.advice_no} onChange={handleChange} required />
        <input name="line" placeholder="Line" value={formData.line} onChange={handleChange} required />
        <input name="item" placeholder="Item" value={formData.item} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input name="warehouse" placeholder="Warehouse" value={formData.warehouse} onChange={handleChange} required />
        <input name="from_location" placeholder="From Location" value={formData.from_location} onChange={handleChange} required />
        <input name="to_location" placeholder="To Location" value={formData.to_location} onChange={handleChange} required />
        <input name="storage_unit" placeholder="Storage Unit" value={formData.storage_unit} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
