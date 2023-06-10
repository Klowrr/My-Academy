import Lottie from "lottie-react";
import Error from "../component/404.json"
const Erorr = () =>{
  return(
    <div className="error">
      <Lottie animationData={Error} loop={true} style={{height:200}}/>
      <p style={{fontSize:"32px", color:"red"}}><em>Errorr</em></p>
    </div>

  )
}
export default Erorr;