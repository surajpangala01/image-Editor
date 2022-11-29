

// import fetch from "fetch";
import {useState,useEffect} from "react";
import Printer from "./Image_printer.js"
import Render from "./image_view"
// import Printer from "./Image_printer" 


function Uploader() {
  var [message, setMessage] = useState([]);

  var base64String ;
  
  async function imageUploaded() 
  {
    var file = document.querySelector('input[type=file]')['files'][0];
  
    var reader = new FileReader();
    console.log("next");
      
    reader.onload = function () 
    {
      base64String = reader.result
      console.log(base64String);
      var img = JSON.stringify({  
          image : base64String
        });
      fetch("http://localhost:5000/student",
      {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body : img
      })
      .then(data =>{
        console.log(data);
      })
    }
    const res =await fetch("http://localhost:5000/student")
    res.json()
    .then((data)=>(setMessage(data)))
    console.log(message);
    reader.readAsDataURL(file);
  }

  function displayString() 
  {
    console.log("Base64String about to be printed");
    

  }

  async function getData()
    {
      const res =await fetch("http://localhost:5000/student")
      res.json()
      .then((data)=>(setMessage(data)))
      console.log(message);
    }
  useEffect(()=>
  {
    getData()
  },[])

  return (
    <div className="App">
      <header className="App-header">
      <div id="div1">
        <input type="file" id="fileId" onChange={imageUploaded}/>
        <br/><br/>
        

      </div>
      <ul>
      {message.map((value,index)=>
          {
            return(<Render image = {value.image}/>)
          })
      } 
      </ul>
      </header>
    </div>
  );
}
export default Uploader;

  

