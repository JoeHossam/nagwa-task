// import {
//     BrowserRouter as Router,
//     Outlet,
//     Route,
//     Routes,
// } from 'react-router-dom';

import './App.css';
import Words from './pages/Words';

function App() {
    return (
        // <Router>
        //     <Routes>
        //         <Route exact path="/" element={<NavLayout />}>
        //             <Route index element={<Home />} />
        //             <Route path="/about" element={<About />} />
        //             <Route path="*" element={<NotFound />} />
        //         </Route>
        //         <Route path="/join" element={<Join />} />
        //     </Routes>
        // </Router>
        <Words />
    );
}

export default App;
