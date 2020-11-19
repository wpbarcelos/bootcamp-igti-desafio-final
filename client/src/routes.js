import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import Home from "./pages/Home";
import EditTransaction from "./pages/EditTransaction";

const NewTransaction = () => <h1>NewTransaction </h1>;

export default function Routes() {
  return (
    <Router>
      <div>
        <h2 className="text-center">Controle Financeiro Pessoal</h2>

        <div className=" text-center m-5">
          <Link to="/" className="btn mr-2">
            Home
          </Link>
          <Link to="/new" className="btn">
            Nova transação
          </Link>
        </div>

        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/new" component={NewTransaction} />
            <Route path="/transaction/:id" component={EditTransaction} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
