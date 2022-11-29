import { useState,useEffect } from "react";
import Printer from "./Image_printer"

function Details()
{
   const contentUploader = (e)=>{
      const requirement = document.querySelector("#image-require").value;
      console.log(requirement);
      var file = document.querySelector('input[type=file]')['files'][0];
   
     var reader = new FileReader();
       
     reader.onload = function () {
         const base64String = reader.result
         var img = JSON.stringify({
         image : base64String,
         required : requirement
      });
      console.log(img);
      fetch("http://localhost:5000/community",{
          method:"POST",
          headers:{"Content-type":"application/json"},
          body : img
        })
   }
   reader.readAsDataURL(file);
   
   }
   return(
      <>
         <div>
            <textarea id = "image-require"placeholder="Enter your needs"/>
         </div>
         <div>
            Choose file<br/>
            <input type = "file" onChange = {contentUploader}/>
         </div>
         
      </>
      )
}





function Community()
{
   var [message, setMessage] = useState([]);
   var [loading, setLoading] = useState(true);
   async function getData()
   {
      const res =await fetch("http://localhost:5000/community")
      res.json()
      .then((data)=>{
         setMessage(data)
         console.log(message);
      })
      .catch((err=>console.error(err)))
      .finally(()=>
      {
         setLoading(false)
      })
   }
   useEffect(()=>
   {
      getData()
   },[])
   if (loading) {
      console.log(message)
      return "Loading";
   }
   return(
      <>
         <nav>
            <div>
               logo   
            </div>
            
            <Details/>
         </nav>
         
         {message.map((v,i)=>{
            return(<Printer content = {v} key = {i} index = {i}/>)
         })}
      </>
   )
   
}

export default Community;