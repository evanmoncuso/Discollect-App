import React from 'react';
import NavBar from './NavBar.jsx';

const App = (props) => (
  <main className="app">
    <NavBar />
    { props.children }
  </main>
);

export default App;
