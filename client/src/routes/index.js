import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Employee from '../components/Employee';
import Cafe from '../components/Cafe';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Cafe />} />
                <Route exact path='/employee' element={<Employee />} />
            </Routes>
        </Router>
    )
};

export default AppRoutes;
