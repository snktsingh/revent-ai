import AppLayout from '@/layout/AppLayout';
import Home from './homepage';
import Header from '@/common-ui/header';
import Footer from '@/common-ui/footer';
function App() {
  return (
    <AppLayout>
      <>
        <Home />
        <Footer />
      </>
    </AppLayout>
  );
}

export default App;
