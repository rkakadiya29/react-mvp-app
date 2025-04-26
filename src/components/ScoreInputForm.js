import React, { useState } from 'react';
import PageHeader from './PageHeader';

const categories = [
  {
    name: 'Verbal Comprehension',
    subcategories: ['Similarities', 'Vocabulary'],
  },
  {
    name: 'Visual Spatial Index',
    subcategories: ['Block Design', 'Visual Puzzles'],
  },
  {
    name: 'Fluid Reasoning Index',
    subcategories: ['Matrix Reasoning', 'Figure Weights'],
  },
  {
    name: 'Working Memory Index',
    subcategories: ['Digit Span', 'Picture Span'],
  },
  {
    name: 'Processing Speed Index',
    subcategories: ['Coding', 'Symbol Search'],
  },
  {
    name: 'Full Scale I.Q.',
    subcategories: [''],
  },
  {
    name: 'General Ability Index',
    subcategories: [''],
  },
  // Add more categories as needed
];

const ancillaryTests = [
  { name: 'Letter-Number Sequencing' },
  { name: 'Arithmetic' },
];

const complimentaryTests = [
  // Add complimentary tests here if needed
];

const inputFields = ['Raw Score', 'Scaled Score', 'Percentile'];

function ScoreInputForm({ candidateData, onNext, onBack }) {
  const [scores, setScores] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setScores(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onNext(scores);
  };

  return (
    <div style={styles.container}>
      <PageHeader name={candidateData.name} age={candidateData.age} />
      <h2 style={styles.heading}>Enter Test Scores</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.tableWrapper}>
          <table style={styles.scoreTable}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Subcategory</th>
                {inputFields.map((field) => (
                  <th key={field} style={styles.th}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <React.Fragment key={category.name}>
                  {category.subcategories.map((subcategory, index) => (
                    <tr key={`${category.name}-${subcategory}`} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                      {index === 0 && (
                        <td rowSpan={category.subcategories.length} style={styles.tdCategory}>
                          {category.name}
                        </td>
                      )}
                      <td style={styles.td}>{subcategory}</td>
                      {inputFields.map((field) => (
                        <td key={field} style={styles.td}>
                          <input
                            type="number"
                            name={`${category.name}-${subcategory}-${field.replace(/\s+/g, '')}`}
                            value={scores[`${category.name}-${subcategory}-${field.replace(/\s+/g, '')}`] || ''}
                            onChange={handleChange}
                            style={styles.input}
                            min="0"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* Ancillary Analysis */}
              {ancillaryTests.map((test) => (
                <tr key={`ancillary-${test.name}`} style={styles.ancillaryRow}>
                  <td style={styles.tdCategory}>Ancillary</td>
                  <td style={styles.td}>{test.name}</td>
                  {inputFields.map((field) => (
                    <td key={field} style={styles.td}>
                      <input
                        type="number"
                        name={`Ancillary-${test.name}-${field.replace(/\s+/g, '')}`}
                        value={scores[`Ancillary-${test.name}-${field.replace(/\s+/g, '')}`] || ''}
                        onChange={handleChange}
                        style={styles.input}
                        min="0"
                      />
                    </td>
                  ))}
                </tr>
              ))}

              {/* Complimentary Analysis */}
              {complimentaryTests.map((test) => (
                <tr key={`complimentary-${test.name}`} style={styles.complimentaryRow}>
                  <td style={styles.tdCategory}>Complimentary</td>
                  <td style={styles.td}>{test.name}</td>
                  {inputFields.map((field) => (
                    <td key={field} style={styles.td}>
                      <input
                        type="number"
                        name={`Complimentary-${test.name}-${field.replace(/\s+/g, '')}`}
                        value={scores[`Complimentary-${test.name}-${field.replace(/\s+/g, '')}`] || ''}
                        onChange={handleChange}
                        style={styles.input}
                        min="0"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={styles.buttonGroup}>
          <button type="button" onClick={onBack} style={styles.backButton}>Back</button>
          <button type="submit" style={styles.nextButton}>Next</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    width: '90%',
    maxWidth: '1000px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  tableWrapper: {
    overflowX: 'auto',
    width: '100%',
    marginBottom: '20px',
  },
  scoreTable: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ddd',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
  },
  th: {
    padding: '12px 15px',
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  tdCategory: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  evenRow: {
    backgroundColor: '#fff',
  },
  oddRow: {
    backgroundColor: '#f9f9f9',
  },
  ancillaryRow: {
    backgroundColor: '#e6f7ff', // Light blue for visual distinction
  },
  complimentaryRow: {
    backgroundColor: '#f0f0f0', // Light gray for visual distinction
  },
  input: {
    width: '100px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  backButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginRight: '10px',
  },
  nextButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default ScoreInputForm;