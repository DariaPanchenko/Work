import Header from './components/Header'
import Footer from './components/Footer'
import Iheader from './components/Iheader'
import { Container } from 'react-bootstrap'
import Prod_card from './parts/Prod_card'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Prod_single_page from './parts/Prod_single_page'
import Cart_card from './parts/Cart_card'
import Log_page from './parts/Log_page'
import Reg_page from './parts/Reg_page'
import Forgot_pass from './parts/Forgot_pass'
function App() {
  return (
      <Router>
      <Iheader/>
      <Header/>
      <main>
          <Container>
              <Route exact path='/' component={Prod_card} />
              <Route path='/capsule/:id' component={Prod_single_page} />
              <Route path='/cart/:id' component={Cart_card} />
              <Route path='/login' component={Log_page} />
              <Route path='/register' component={Reg_page} />
              <Route path='/forgotpass' component={Forgot_pass} />
          </Container>
      </main>
      <Footer/>
      </Router>
  );
}

export default App;
