import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import PersonalizePage from './PersonalizePage';
import PageMyFund from './page-myFund';
import PageMyTag from './page-myTag';
import PageCharacterAnalysis from './page-characterAnalysis';
import PagePig from './page-pig';

import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  render(){
    return(
      <Router >
        <div>
          <Route path="/" component={PersonalizePage} />
          <Route path="/page-myFund" component={PageMyFund} />
          <Route path="/page-myTag" component={PageMyTag} />
          <Route path="/page-characterAnalysis" component={PageCharacterAnalysis} />
          <Route path="/page-pig" component={PagePig} />
          <Route path="/page-monthlyReport" component={PageMonthlyReport} />
        </div>
      </Router>
    )
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
