import { motion } from "framer-motion";



const Header = (props) => {
  return (
    <div className="header">
      <motion.div exit={0} initial={{opacity:0}} animate={{opacity:1}} className="header-item">
        <h1>{props.title}</h1>
      </motion.div>
      
    </div>
  )
}
export default Header;