import React from "react";
import ErrorBoundary from './ErrorBoundary';
import AppRouter from "./components/AppRouter";
const App = () => {
  return (
    <ErrorBoundary>
      <AppRouter/>
    </ErrorBoundary>
  )
};

export default App;
