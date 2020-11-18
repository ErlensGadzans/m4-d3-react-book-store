import React from "react"
import {Col, h4, Badge} from "react-bootstrap"
export default class MyBadge extends React.Component {
    render() {
    return(

<Col className="text-centred" xs={12}>
<h4>
    <Badge style={{backgroundColor: this.props.color}} variant="secondary">{this.props.text}</Badge>
  </h4>
  </Col>
    )
    }}