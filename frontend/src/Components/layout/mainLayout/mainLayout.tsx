import { useSelector } from "react-redux";
import MainRoute from "../../Routs/mainRoute/mainRoute";
import FooterLayout from "../footerLayout/footerLayout";
import HeaderLayout from "../headerLayout/headerLayout";
import MenuLayout from "../menuLayout/menuLayout";
import "./mainLayout.css";
import { RootState } from "../../redux/store";

function MainLayout(): JSX.Element {
    const authData = JSON.parse(localStorage.getItem('auth') || '{}');
    const userRole = useSelector((state: RootState) => state.auth.role) || authData.role;

    return (
        <div className="mainLayout">
			<header>
                <HeaderLayout/>
            </header>
            {userRole === 'admin' && (
            <aside>
                <MenuLayout/>
            </aside>
            )}
            <main style={{ gridColumn: userRole === 'admin' ? 'span 5' : 'span 6'}}>
                <MainRoute />
            </main>
            <footer>
                <FooterLayout/>
            </footer>
        </div>
    );
}

export default MainLayout;
