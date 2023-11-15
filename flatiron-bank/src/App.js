import './App.css';
import { createContext } from 'react';
import Header from './Header';
import Main from './Main';
export let bankContext = createContext();

function App() {

  // event handlers
  function preventDef(event){
    return(
        event.preventDefault()
    );
  };

  return (
    <div className='container'>
      <bankContext.Provider value={{preventDef}}>
        <Header className="header"></Header>
        <Main></Main>
      </bankContext.Provider>
    </div>
  );
}

export default App;