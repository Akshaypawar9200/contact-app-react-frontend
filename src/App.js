
import { Route, Routes } from "react-router-dom";
import GetAllUser from "./components/getAllUser/GetAllUser";
import Login from "./components/login/Login";
import Table from "./sharedcomponent/table/Table";
import AllContact from "./components/getAllContact/AllContact";
import GetAllContactDetails from "./components/getAllContactDetails/GetAllContactDetails";



function App() {
  return (
   <Routes>
    <Route exact path={`/`}element={<Login/>}/>
    <Route exact path={`/alluser/`}element={<GetAllUser/>}/>
    <Route exact path={`/allcontact/`}element={<AllContact/>}/>
    <Route exact path={`/allcontactdetail/`}element={<GetAllContactDetails/>}/>
 
   </Routes>

  );
}

export default App;
