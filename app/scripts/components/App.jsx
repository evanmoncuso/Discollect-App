import React from 'react';
import NavBar from './NavBar.jsx';

const App = (props) => (
  <main>
    <NavBar />
    { props.children }
  </main>
);

export default App;
