import React from 'react';

function PageHeader({ name, age }) {
  return (
    <div style={styles.header}>
      {name && <p>Candidate Name: {name}</p>}
      {age !== '' && <p>Age: {age}</p>}
    </div>
  );
}

const styles = {
  header: {
    marginBottom: '15px',
    padding: '10px',
    borderBottom: '1px solid #eee',
    textAlign: 'left', // Adjust as needed
  },
};

export default PageHeader;