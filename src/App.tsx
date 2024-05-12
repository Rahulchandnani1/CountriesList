// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import CountryDetailPage from './CountryDetailPage';
import { AppProvider } from './AppContext';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
      <Routes>
      <Route path="/" Component={HomePage} />
      
      <Route path="/country/:countryCode" Component={CountryDetailPage} />
      </Routes></AppProvider>
    </Router>
  );
};

export default App;
