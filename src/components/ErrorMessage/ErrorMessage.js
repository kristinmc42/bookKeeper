// this will display if there is an error in the API call to Google Books

import Card from "../Card/Card";
import "./ErrorMessage.scss";

function ErrorMessage() {
  return(
    <Card className="error">
      <h2>Sorry. There was an error with the information you entered. Please try again.</h2>
    </Card>
  )
}


export default ErrorMessage;