import React, { useState, useEffect } from 'react';
import PageHeader from './PageHeader';

function ScoreCalculationPage({ candidateData, scores, onBack }) {
  const [scaleData, setScaleData] = useState([]);

  useEffect(() => {
    const initialScaleData = [
      {
        name: 'Verbal Comprehension',
        sumScaledScore: calculateSumScaledScore('Verbal Comprehension'),
        compositeScore: calculateCompositeScore('Verbal Comprehension', calculateSumScaledScore('Verbal Comprehension')),
        percentileRank: calculatePercentileRank('Verbal Comprehension', calculateCompositeScore('Verbal Comprehension', calculateSumScaledScore('Verbal Comprehension'))),
        graph: false,
        text: false,
      },
      {
        name: 'Visual Spatial Index',
        sumScaledScore: calculateSumScaledScore('Visual Spatial Index'),
        compositeScore: calculateCompositeScore('Visual Spatial Index', calculateSumScaledScore('Visual Spatial Index')),
        percentileRank: calculatePercentileRank('Visual Spatial Index', calculateCompositeScore('Visual Spatial Index', calculateSumScaledScore('Visual Spatial Index'))),
        graph: false,
        text: false,
      },
      {
        name: 'Fluid Reasoning Index',
        sumScaledScore: calculateSumScaledScore('Fluid Reasoning Index'),
        compositeScore: calculateCompositeScore('Fluid Reasoning Index', calculateSumScaledScore('Fluid Reasoning Index')),
        percentileRank: calculatePercentileRank('Fluid Reasoning Index', calculateCompositeScore('Fluid Reasoning Index', calculateSumScaledScore('Fluid Reasoning Index'))),
        graph: false,
        text: false,
      },
      {
        name: 'Working Memory Index',
        sumScaledScore: calculateSumScaledScore('Working Memory Index'),
        compositeScore: calculateCompositeScore('Working Memory Index', calculateSumScaledScore('Working Memory Index')),
        percentileRank: calculatePercentileRank('Working Memory Index', calculateCompositeScore('Working Memory Index', calculateSumScaledScore('Working Memory Index'))),
        graph: false,
        text: false,
      },
      {
        name: 'Processing Speed Index',
        sumScaledScore: calculateSumScaledScore('Processing Speed Index'),
        compositeScore: calculateCompositeScore('Processing Speed Index', calculateSumScaledScore('Processing Speed Index')),
        percentileRank: calculatePercentileRank('Processing Speed Index', calculateCompositeScore('Processing Speed Index', calculateSumScaledScore('Processing Speed Index'))),
        graph: false,
        text: false,
      },
      {
        name: 'Full Scale I.Q.',
        sumScaledScore: calculateSumScaledScore('Full Scale I.Q.'),
        compositeScore: calculateCompositeScore('Full Scale I.Q.', calculateSumScaledScore('Full Scale I.Q.')),
        percentileRank: calculatePercentileRank('Full Scale I.Q.', calculateCompositeScore('Full Scale I.Q.', calculateSumScaledScore('Full Scale I.Q.'))),
        graph: false,
        text: false,
      },
      {
        name: 'General Ability Index',
        sumScaledScore: calculateSumScaledScore('General Ability Index'),
        compositeScore: calculateCompositeScore('General Ability Index', calculateSumScaledScore('General Ability Index')),
        percentileRank: calculatePercentileRank('General Ability Index', calculateCompositeScore('General Ability Index', calculateSumScaledScore('General Ability Index'))),
        graph: false,
        text: false,
      },
    ];
    setScaleData(initialScaleData);
  }, [scores]);

  const calculateSumScaledScore = (scaleName) => {
    let sum = 0;
    if (scaleName === 'Verbal Comprehension') {
      sum += parseInt(scores['Verbal Comprehension-Subcategory A-Scaled Score'] || 0);
      sum += parseInt(scores['Verbal Comprehension-Subcategory B-Scaled Score'] || 0);
    } else if (scaleName === 'Visual Spatial Index') {
      sum += parseInt(scores['Visual Spatial Index-Subcategory A-Score'] || 0);
      sum += parseInt(scores['Visual Spatial Index-Subcategory B-Score'] || 0);
    } else if (scaleName === 'Fluid Reasoning Index') {
      sum += parseInt(scores['Fluid Reasoning Index-Subcategory A-Score'] || 0);
      sum += parseInt(scores['Fluid Reasoning Index-Subcategory B-Score'] || 0);
    } else if (scaleName === 'Working Memory Index') {
      sum += parseInt(scores['Working Memory Index-Subcategory A-Score'] || 0);
      sum += parseInt(scores['Working Memory Index-Subcategory B-Score'] || 0);
    } else if (scaleName === 'Processing Speed Index') {
      sum += parseInt(scores['Processing Speed Index-Subcategory A-Score'] || 0);
      sum += parseInt(scores['Processing Speed Index-Subcategory B-Score'] || 0);
    } else if (scaleName === 'Full Scale I.Q.') {
      sum = parseInt(scores['Full Scale I.Q.-Score'] || 0);
    } else if (scaleName === 'General Ability Index') {
      sum = parseInt(scores['General Ability Index-Score'] || 0);
    }
    return isNaN(sum) ? '' : sum;
  };

  const calculateCompositeScore = (scaleName, sumScaled) => {
    // Placeholder logic - replace with actual calculation based on the test framework
    if (scaleName === 'Verbal Comprehension') {
      return parseInt(sumScaled || 0) + 100; // Example calculation
    }
    return sumScaled;
  };

  const calculatePercentileRank = (scaleName, compositeScore) => {
    // Placeholder logic - replace with actual percentile rank lookup
    if (scaleName === 'Verbal Comprehension' && compositeScore) {
      return Math.round((parseInt(compositeScore || 0) / 150) * 99); // Example approximation
    }
    return '';
  };

  const handleInputChange = (index, name, value) => {
    const updatedScaleData = [...scaleData];
    updatedScaleData[index][name] = value;
    setScaleData(updatedScaleData);
  };

  const handleCheckboxChange = (index, name, checked) => {
    const updatedScaleData = [...scaleData];
    updatedScaleData[index][name] = checked;
    setScaleData(updatedScaleData);
  };

  return (
    <div style={styles.container}>
      <PageHeader name={candidateData.name} age={candidateData.age} />
      <h2 style={styles.heading}>Score Summary and Report Options</h2>
      <table style={styles.scoreTable}>
        <thead>
          <tr>
            <th style={styles.th}>Scale</th>
            <th style={styles.th}>Sum of Scaled Scores</th>
            <th style={styles.th}>Composite Score</th>
            <th style={styles.th}>Percentile Rank</th>
            <th style={styles.th}>Graph</th>
            <th style={styles.th}>Text</th>
          </tr>
        </thead>
        <tbody>
          {scaleData.map((scale, index) => (
            <tr key={scale.name} style={styles.tableRow}>
              <td style={styles.td}>{scale.name}</td>
              <td style={styles.td}>
                <input
                  type="number"
                  value={scale.sumScaledScore}
                  onChange={(e) => handleInputChange(index, 'sumScaledScore', e.target.value)}
                  style={styles.inputField}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="number"
                  value={scale.compositeScore}
                  onChange={(e) => handleInputChange(index, 'compositeScore', e.target.value)}
                  style={styles.inputField}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="number"
                  value={scale.percentileRank}
                  onChange={(e) => handleInputChange(index, 'percentileRank', e.target.value)}
                  style={styles.inputField}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="checkbox"
                  checked={scale.graph}
                  onChange={(e) => handleCheckboxChange(index, 'graph', e.target.checked)}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="checkbox"
                  checked={scale.text}
                  onChange={(e) => handleCheckboxChange(index, 'text', e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onBack} style={styles.backButton}>Back</button>
      {/* Add a button to generate the final report */}
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
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
  },
  heading: {
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  scoreTable: {
    width: '95%',
    maxWidth: '900px',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  tableRow: {
    '&:nth-child(even)': {
      backgroundColor: '#f9f9f9',
    },
  },
  th: {
    backgroundColor: '#eee',
    color: '#333',
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #eee',
  },
  inputField: {
    width: '100px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
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
    marginTop: '20px',
  },
};

export default ScoreCalculationPage;