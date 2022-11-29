import react from "react"
import { Routes,Route,BrowserRouter, Link } from "react-router-dom"
import Community from "./community"
import Uploader from "./testrun"

function App()
{
   return(
   <BrowserRouter>
      <Link to = "/community">community</Link>
      <Link to = "/Uploader">Image Uploader</Link>
      <Routes>
         <Route path = "/community" element = {<Community/>}/>
         <Route path = "/uploader" element = {<Uploader/>}/>
      </Routes>
   </BrowserRouter>

   )
}

export default App;