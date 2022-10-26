import React, { useContext, useState } from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";
import OrderProvider from "./store/OrderProvider";

function App() {

  const authContext = useContext(AuthContext); 
  
  const views = [ "home", "users", "admin" ];
  const [activeView, setActiveView] = useState(views[0]);
  const changeViewHandler = (selectedView) => {
    setActiveView(selectedView);
  };

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!authContext.isLoggedIn && <Login/>}
        {authContext.isLoggedIn && (
          <OrderProvider>
            <Home />
          </OrderProvider>
        )}
      </main>
    </React.Fragment>
  );
}

export default App;
