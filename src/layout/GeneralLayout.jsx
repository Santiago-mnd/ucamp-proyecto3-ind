import Footer from './Footer';
import Header from './Header';
import MainContent from './MainContent';

const GeneralLayout = ({ children }) => {
  return (
    <>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  );
};

export default GeneralLayout;
