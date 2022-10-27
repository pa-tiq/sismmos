import React, { useContext, useState } from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import Admin from "./components/Admin/Admin";
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
      <MainHeader views={views} onChangeView={changeViewHandler}/>
      <main>
        {!authContext.isLoggedIn && <Login/>}
        {authContext.isLoggedIn && (
          <OrderProvider>
            {activeView === views[0] && <Home />}
            {activeView === views[2] && <Admin />}
          </OrderProvider>
        )}
      </main>
    </React.Fragment>
  );
}

export default App;
