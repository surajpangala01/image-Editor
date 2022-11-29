function Render(props){
   
   return(
      <div>
         <img src = {props.image}/>
         <a download = "image.png" href = {props.image}>download</a>
         <br/>
         ------------------------------------
      </div>
   )
}

export default Render;