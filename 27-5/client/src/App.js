import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', age: '', major: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) alert('Lưu thành công!');
      else alert('Lỗi khi lưu!');
    } catch (error) {
      alert('Lỗi server!');
    }
  };

  return (
    <div className="container">
      <h2>Thông tin sinh viên</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Họ tên"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Tuổi"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="major"
          placeholder="Ngành học"
          value={formData.major}
          onChange={handleChange}
          required
        />
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}

export default App;