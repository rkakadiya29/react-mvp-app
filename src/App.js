import React, { useState } from 'react';
import CandidateDetailsForm from './components/CandidateDetailsForm';
import TestSelectionPage from './components/TestSelectionPage'; // Import the new component
import ScoreInputForm from './components/ScoreInputForm';
import ScoreCalculationPage from './components/ScoreCalculationPage'

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [candidateData, setCandidateData] = useState({});
  const [selectedFrameworks, setSelectedFrameworks] = useState({});
  const [testScores, setTestScores] = useState({});

  const handleNextPage = (data) => {
    if (currentPage === 1) {
      setCandidateData(data);
      setCurrentPage(2); // To Test Selection
    } else if (currentPage === 3) {
      setTestScores(data);
      setCurrentPage(4); // To Score Calculation
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFrameworksSelected = (frameworks) => {
    setSelectedFrameworks(frameworks);
    // For now, navigate to IQ test input if a framework is selected for it
    if (frameworks['iq_test']) {
      setCurrentPage(3);
    } else {
      alert('Navigating based on selected frameworks (not fully implemented).');
    }
  };

  const renderPage = () => {
    let pageHeading = "IQ Test Score Input"; // Default heading

    switch (currentPage) {
      case 1:
        return <CandidateDetailsForm onNext={handleNextPage} />;
      case 2:
        pageHeading = "Select Tests"; // Updated heading for Test Selection Page
        return (
          <TestSelectionPage
            onNext={handleFrameworksSelected}
            onBack={handlePreviousPage}
            candidateData={candidateData}
          />
        );
      case 3:
        return (
          <ScoreInputForm
            candidateData={candidateData}
            selectedFrameworks={selectedFrameworks}
            onNext={handleNextPage}
            onBack={handlePreviousPage}
          />
        );
      case 4:
        return <ScoreCalculationPage candidateData={candidateData} scores={testScores} onBack={handlePreviousPage} />;
      default:
        return <div>Something went wrong.</div>;
    }

    return (
      <div style={styles.appContainer}>
        <h1>{pageHeading}</h1> {/* Use the dynamic pageHeading */}
        {renderPage()}
      </div>
    );
  };

  return renderPage(); // Call renderPage directly in the return
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
};

export default App;