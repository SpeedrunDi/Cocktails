import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route render={() => <h1>Not Found</h1>}/>
            </Switch>
        </Layout>
    );
}

export default App;
