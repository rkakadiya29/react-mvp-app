import React, { useState } from 'react';

function CandidateDetailsForm({ onNext }) {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    currentDate: new Date().toISOString().split('T')[0], // Initialize with current date
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) age--;
    return age;
  };

  const handleDOBChange = (event) => {
    handleChange(event);
    const calculatedAge = calculateAge(event.target.value);
    setFormData(prevState => ({ ...prevState, age: calculatedAge }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onNext(formData); // Pass the form data to the parent component
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Candidate Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="dob" style={styles.label}>Date of Birth:</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleDOBChange} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="age" style={styles.label}>Age:</label>
          <input type="text" id="age" name="age" value={formData.age} style={styles.input} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="currentDate" style={styles.label}>Current Date:</label>
          <input type="text" id="currentDate" name="currentDate" value={formData.currentDate} style={styles.input} readOnly />
        </div>
        <button type="submit" style={styles.button}>Next</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    width: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    width: '120px',
    textAlign: 'right',
    marginRight: '10px',
    color: '#555',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default CandidateDetailsForm;