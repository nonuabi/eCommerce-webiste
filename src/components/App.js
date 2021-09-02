import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Navbar,
  Products,
  NewProduct,
  InformationContainer,
  CartContainer,
} from ".";
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/products" component={Products} />
        <Route path="/new" component={NewProduct} />
        <Route path="/productInformation" component={InformationContainer} />
        <Route path="/cartComponent" component={CartContainer} />
      </Switch>
    </div>
  );
};

export default App;
