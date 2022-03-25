import { Route, Routes, useNavigate } from 'react-router-dom';

import Employee from '../components/Employee';
import Cafe from '../components/Cafe';
import EditCafe from '../components/Cafe/EditCafe';
import EditEmployee from '../components/Employee/EditEmployee';

const AppRoutes = () => {
    const navigate = useNavigate();
    return (
        <Routes>
            <Route exact path='/' element={<Cafe navigate={navigate} />} />
            <Route exact path='/employee' element={<Employee navigate={navigate} />} />
            <Route exact path='/employee/edit/:id' element={<EditEmployee navigate={navigate} />} />
            <Route exact path='/cafe/edit/:id' element={<EditCafe navigate={navigate} />} />
        </Routes>
    )
};

export default AppRoutes;
