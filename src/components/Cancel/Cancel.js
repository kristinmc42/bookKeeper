import { Link } from "react-router-dom";
import "./Cancel.scss";

function Cancel (){
  return(
     <Link className="cancel" to="/">Cancel</Link>
  )
}

export default Cancel;