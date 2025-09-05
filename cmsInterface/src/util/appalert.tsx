import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


function AppAlert(props) {
  const [show, setShow] = useState(props.error?.status);

  if (props.error.status) {
    return (
      <Alert variant="danger" onClose={() => {console.log("closing"); props.onClose(); setShow(false)}} dismissible>
        <Alert.Heading>Upps..., Something was wrong: {props.error?.titulo}</Alert.Heading>
        <p>
         {props.error?.description}
        </p>
      </Alert>
    );
  }
}

export default AppAlert;