import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import  './App.css'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux';
import {ClearFeedbacks} from './actions/spendActions';
import Feedbacks from './Feedbacks';
import IdleTimer from 'react-idle-timer'
import Navbar from './Navbar';
import ProductList from './Products/ProductList'
import Cart from './Cart/Cart';
import Favorites from './Favorites/Favorites'
import Product from './Products/Product';
const App = () => {
  const states = useSelector(state=>state.SpendState);
  const dispatch = useDispatch();
  const emptystyle = {
    "marginBottom":"-100px"
  }
  const loadedstyle = {
    "marginBottom":"0"
  }
  const Warning = () => (
    <div className="fixed-bottom" style={{left:"45%",top:"30%"}}>Bu sayfa bulunamadı....
    
    
    </div>
  )
return (
  
      <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={ProductList}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/favorites" component={Favorites}></Route>
        <Route path="/products/:id" component={Product}></Route>
        <Route path="*" component={Warning}></Route>
      </Switch>
      <div className="feedback" style={states.feedbacks.length>0?loadedstyle:emptystyle}>
          <IdleTimer
          timeout={5*1000}
          onIdle={()=>dispatch(ClearFeedbacks())}
          debounce={250}
        />
        <Feedbacks feedbacks={states.feedbacks}/>
        <p className="position-absolute hidefeedback" onClick={()=>{dispatch(ClearFeedbacks())}}><i className="fas fa-times"></i></p>
      </div>
      </BrowserRouter>
)
}
export default App