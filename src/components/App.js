import React from 'react';

class App extends React.Component{
  constructor () {
    super();
  }

  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
};

export default App;
