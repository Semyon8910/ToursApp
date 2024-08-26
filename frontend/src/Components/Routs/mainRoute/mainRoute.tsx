import { Navigate, Route, Routes } from "react-router-dom";
import "./mainRoute.css";
import Page404 from "../../pages/page404/page404";
import Authentication from "../../pages/Authentication/Authentication";
import Registration from "../../pages/Registration/Registration";
import VacationsList from "../../pages/vacationsList/vacationsList";
import AddVacation from "../../pages/addVacation/addVacation";
import Report from "../../pages/report/report";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "notyf/notyf.min.css";
import EditVacation from "../../pages/editVacation/editVacation";

function MainRoute(): JSX.Element {

    const authData = JSON.parse(localStorage.getItem('auth') || '{}');
    const isAuthenticated = authData.isAuthenticated;
    const role = useSelector((state: RootState) => state.auth.role) || authData.role;

    return (
        <div className="mainRoute">
			<Routes>
                <Route path="/" element={<Authentication/>}/>
                <Route path="/register" element={<Registration/>} />
                <Route path="/vacations" element={isAuthenticated ? <VacationsList /> : <Navigate to="/" />} />
                <Route path="/addVacation" element={isAuthenticated && role === 'admin' ? <AddVacation /> : <Navigate to="/"/>}/>
                <Route path="/editVacation/:id" element={isAuthenticated && role === 'admin' ? <EditVacation /> : <Navigate to="/"/>}/>
                <Route path="/report" element={isAuthenticated && role === 'admin' ? <Report /> : <Navigate to="/"/>} />
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default MainRoute;
