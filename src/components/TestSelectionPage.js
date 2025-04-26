import React, { useState } from 'react';

function TestSelectionPage({ onNext, onBack, candidateData }) {
  const [selectedFrameworks, setSelectedFrameworks] = useState({});

  const tests = [
    { value: 'iq_test', label: 'IQ Test', frameworks: [
      { value: 'wisc_v', label: 'WISC-V' },
      { value: 'stanford_binet', label: 'Stanford-Binet' },
      { value: 'riemann_iq', label: 'Riemann IQ' },
      { value: 'other_iq', label: 'Other' },
    ], status: 'Not Taken' }, // Initial status
    { value: 'aptitude_test', label: 'Aptitude Test', frameworks: [
      { value: 'gatb', label: 'GATB' },
      { value: 'asvab', label: 'ASVAB' },
      { value: 'mat', label: 'MAT' },
      { value: 'other_aptitude', label: 'Other' },
    ], status: 'Not Taken' },
    { value: 'personality_test', label: 'Personality Test', frameworks: [
      { value: 'mbti', label: 'MBTI' },
      { value: 'big_five', label: 'Big Five' },
      { value: 'enneagram', label: 'Enneagram' },
      { value: 'disc', label: 'DISC' },
      { value: 'other_personality', label: 'Other' },
    ], status: 'Not Taken' },
    { value: 'achievement_test', label: 'Achievement Test', frameworks: [
      { value: 'stanford_achievement', label: 'Stanford Achievement Test' },
      { value: 'iowa_assessments', label: 'Iowa Assessments' },
      { value: 'terra_nova', label: 'TerraNova' },
      { value: 'casas', label: 'CASAS' },
    ], status: 'Not Taken' },
  ];

  const handleFrameworkChange = (testValue, event) => {
    const newFramework = event.target.value;
    setSelectedFrameworks(prevState => ({
      ...prevState,
      [testValue]: newFramework,
    }));
    // Update status when a framework is selected
    const updatedTests = tests.map(test =>
      test.value === testValue ? { ...test, status: newFramework ? 'Selected' : 'Not Taken' } : test
    );
    // For simplicity, we'll update the 'tests' array directly here for status display.
    // In a more complex app, you might manage this state differently.
    tests.forEach((test, index) => {
      if (test.value === testValue) {
        tests[index].status = newFramework ? 'Selected' : 'Not Taken';
      }
    });
  };

  const handleNext = () => {
    const selected = Object.keys(selectedFrameworks).filter(test => selectedFrameworks[test]);
    if (selected.length > 0) {
      onNext(selectedFrameworks);
    } else {
      alert('Please select a framework for at least one test to proceed.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>TESTS</h2>
        {candidateData && (
          <p style={styles.candidateInfo}>
            Name: {candidateData.name}, Age: {candidateData.age}
          </p>
        )}
      </div>
      <div style={styles.card}>
        {tests.map((test) => (
          <div key={test.value} style={styles.testRow}>
            <label style={styles.testLabel}>{test.label}:</label>
            <div style={styles.selectionContainer}>
              <select
                value={selectedFrameworks[test.value] || ''}
                onChange={(e) => handleFrameworkChange(test.value, e)}
                style={styles.frameworkSelect}
              >
                <option value="">Select Framework</option>
                {test.frameworks.map((framework) => (
                  <option key={framework.value} value={framework.value}>
                    {framework.label}
                  </option>
                ))}
              </select>
              <span style={styles.status}>{test.status}</span>
            </div>
          </div>
        ))}
        <div style={styles.buttonGroup}>
          <button onClick={onBack} style={styles.backButton}>Back</button>
          <button onClick={handleNext} style={styles.nextButton}>Next</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    fontFamily: 'sans-serif',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  heading: {
    color: '#333',
    marginBottom: '10px',
  },
  candidateInfo: {
    color: '#666',
    fontSize: '16px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '600px',
  },
  testRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '15px',
    alignItems: 'center',
    marginBottom: '20px',
  },
  testLabel: {
    fontWeight: '600',
    color: '#444',
    textAlign: 'left',
  },
  selectionContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  frameworkSelect: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    backgroundColor: '#f9f9f9',
    color: '#555',
    width: '70%',
    boxSizing: 'border-box',
    '&:focus': {
      borderColor: '#007bff',
      outline: 'none',
      boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
  },
  status: {
    fontSize: '16px',
    color: '#888',
    fontStyle: 'italic',
    width: '30%',
    textAlign: 'right',
  },
  buttonGroup: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#5a6268',
    },
  },
  nextButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
};

export default TestSelectionPage;