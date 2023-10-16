import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './pages/Main/index';

import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' element={<Main />}/>
                    <Route path='/:slug' element={< Main />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
