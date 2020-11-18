import React from "react"
import {Alert, Col} from "react-bootstrap"
export default class WarningSign extends React.Component {
    render() {
    return(
<Col className="text-center">
<Alert xs={12} variant="danger">
This is a {this.props.text} alert—check it out!
</Alert>
</Col>
)
}
}