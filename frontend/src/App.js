import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import MainPage from "./containers/MainPage/MainPage";
import AddIngredients from "./containers/AddIngredients/AddIngredients";
import AdminPanel from "./containers/AdminPanel/AdminPanel";
import UserPanel from "./containers/UserPanel/UserPanel";
import Cocktail from "./containers/Cocktail/Cocktail";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/cocktail/new" component={AddIngredients}/>
                <Route path="/cocktail/:id" component={Cocktail}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/admin_panel" component={AdminPanel}/>
                <Route path="/user_panel" component={UserPanel}/>
                <Route render={() => <h1>Not Found</h1>}/>
            </Switch>
        </Layout>
    );
}

export default App;
