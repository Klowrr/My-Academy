import Lottie from "lottie-react";
import icohom from "../component/home.json"
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const FirstPage = () => {
  return (
    <div className="firstpage">
      <motion.div animate={{y:0}} initial={{y:-200}} className="firstpage-item">
        <h1>WELCOME TO ACADEMY</h1>
        <p>Where you can manage your study plan</p> 
        <Lottie animationData={icohom} loop={true} style={{width:300}}/>
        <Link to="/Home"><h3>Click Me!</h3></Link>
      </motion.div>
    </div>
  )
}
export default FirstPage;