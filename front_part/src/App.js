import Header from './components/Header'
import Footer from './components/Footer'
import Iheader from './components/Iheader'
import { Container } from 'react-bootstrap'
function App() {
  return (
      <>
      <Iheader/>
      <Header/>
      <main>
          <Container>
              <h4>Text</h4>
          </Container>

      </main>
      <Footer/>
      </>
  );
}

export default App;
