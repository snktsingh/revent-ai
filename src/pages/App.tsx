import AppLayout from '@/layout/AppLayout';
import Home from './homepage';
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
