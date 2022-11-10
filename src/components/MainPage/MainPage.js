import './MainPage.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';


function MainPage() {
    return (
        <>
            <Header
                isAbout='true'   
            />
            <Main />
            <Footer />
        </>
    );
};

export default MainPage;