import Lottie from "lottie-react";
import icohom from "../component/boyavater.json"
import { motion } from "framer-motion";
const Home= () => {
  return (
    <motion.div animate={{y:0}} initial={{y:-200}} className="home" >
      <div className="home-item">
        <h1>Welcome to Academy</h1>
        <Lottie animationData={icohom} style={{height:300}}/>
      </div>
    </motion.div>
    
  )
}
export default Home;