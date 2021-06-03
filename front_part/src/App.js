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
import Submit_page from './parts/Submit_page'
import Prof_page from './parts/Prof_page'
import Pay_page from './parts/Pay_page'
import Paid_orders_page from './parts/Paid_orders_page'
import UserALL_page from './parts/UserAll_page'
import UserChange_page from './parts/UserChange_page'
import ProdALL_page from './parts/ProdAll_page'
import ProdCreate_page from './parts/ProdCreate_page'
import ProdALLCreator_page from './parts/ProdAllCreator_page'
import ProdCreateCr_page from './parts/ProdCreateCr_page'
function App() {
  return (
      <Router>
      <Iheader/>
      <Header/>
      <main>
          <Container>
              <Route exact path='/' component={Prod_card} />
              <Route path='/capsule/:id' component={Prod_single_page} />
              <Route path='/cart/:id?' component={Cart_card} />
              <Route path='/login' component={Log_page} />
              <Route path='/register' component={Reg_page} />
              <Route path='/forgot' component={Forgot_pass} />
              <Route path='/submit' component={Submit_page} />
              <Route path='/profile' component={Prof_page}/>
              <Route path='/allpayment' component={Pay_page}/>
              <Route path='/order/:id' component={Paid_orders_page}/>
              <Route path='/admin/userAll' component={UserALL_page}/>
              <Route path='/admin/user/:id/change' component={UserChange_page}/>
              <Route path='/admin/capsAll' component={ProdALL_page}/>
              <Route path='/admin/capsule/:id/change' component={ProdCreate_page}/>
              <Route path='/creator/capsAll' component={ProdALLCreator_page}/>
              <Route path='/creator/capsule/:id/change' component={ProdCreateCr_page}/>
          </Container>
      </main>
      <Footer/>
      </Router>
  );
}

export default App;
