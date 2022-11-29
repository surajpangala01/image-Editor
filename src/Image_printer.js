// import { render } from "@testing-library/react"
import {useState} from "react"

function Printer(props)
{
   const id = "file_input"+props.index;
   var [data,setData] = useState()
   function image_downloader(img){
      const link = document.createElement("a");
      link.download = "image.jpg";
      link.href = img;
      link.click();
   }
   async function imageUploaded() 
   {
      var base64String;
      var file = document.querySelector("#"+id)['files'][0];
      var reader = new FileReader();
      console.log("next");
      console.log(file)
      console.log(props.index)
      reader.onload = function () 
      {
         base64String = reader.result
         console.log(base64String);
         var update = JSON.stringify({  
            uploaded_image : base64String,
            id:props.content._id
         });
         fetch("http://localhost:5000/community",
         {
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body : update
         })
         .then((data) =>{
            console.log(data);
            // file = null;
            document.querySelector("#"+id)['files'][0] = undefined
         })
      }
      reader.readAsDataURL(file);
   }
   return( 
   <>
      <div style= {{background:"#EBEBEB",border:"5px solid #EBEBEB",borderRadius:"15px",display:"flex",flexDirection:"column"}}>
         <div><img src = {props.content.image} style = {{height : "250px",width : "250px",borderRadius:"15px"}}></img>
         </div>
         <div><p>{props.content.required}</p></div>
         <div>
            <button onClick = {()=>
            {
               image_downloader(props.content.image)
            }}>download</button>
            <input type="file" id = {id}accept="image/*" onChange={imageUploaded}></input>
           
            <button onClick={async ()=>
            {
               const res = await fetch("http://localhost:5000/community/"+props.content._id)
               res.json()
               .then((maal)=>
               {
                  console.log("ulai : ",maal.updated_image)
                  image_downloader(maal.updated_image)
               })
            }}>download_worked</button>
         </div>
      </div>
   </>
   )

}

export default Printer;

