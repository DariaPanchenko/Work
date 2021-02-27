import Header from './components/Header'
import Footer from './components/Footer'
import Iheader from './components/Iheader'
import { Container } from 'react-bootstrap'
import Prod_card from './parts/Prod_card'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Prod_single_page from './parts/Prod_single_page'
function App() {
  return (
      <Router>
      <Iheader/>
      <Header/>
      <main>
          <Container>
              <Route exact path='/' component={Prod_card} />
              <Route path='/capsule/:id' component={Prod_single_page} />

          </Container>
      </main>
      <Footer/>
      </Router>
  );
}

export default App;
