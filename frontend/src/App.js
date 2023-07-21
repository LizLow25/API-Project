import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList";
import SpotDetails from "./components/SpotDetails";
import SpotForm from "./components/SpotForm";
import ManageSpots from "./components/ManageSpots";
import UpdateSpotFormGateway from "./components/UpdateSpotFormGateway";
import Bookings from "./components/Bookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path="/" component={SpotList} />
        <Route exact path="/bookings" component={Bookings} />
        <Route exact path="/spots/new" component={SpotForm} />
        <Route exact path="/spots/current" component={ManageSpots} />
        <Route exact path="/spots/:spotId" component={SpotDetails} />
        <Route exact path="/spots/:spotId/edit" component={UpdateSpotFormGateway} />
        </Switch>}
    </>
  );
}

export default App;
