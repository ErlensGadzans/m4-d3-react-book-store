import React from "react"

import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'

class CommentForm extends React.Component {
    state = {
        comments: {
            comment: '',
            rate: '1',
            elementId: this.props.bookId,
        },
        errMessage: '',
        loading: false
    }

    updateCommentsField = (e) => {
        console.log(this.state)
        let comments = { ...this.state.comments } // creating a copy of the current state
      //  let currentId = e.currentTarget.id // 'name', 'phone', etc.

       
        //comments['comment'] --> comments.name = 'S'
        //comments['rate'] --> comments.phone = '3'
        this.setState({comments: comments, [e.currentTarget.name]:e.currentTarget.value} )
    }

    submitComments = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        console.log(this.state)
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/',
                {
                    method: 'POST',
                    body: JSON.stringify(this.state.comments),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NjkwNjk4MzViMDAwMTc1ODRlZTgiLCJpYXQiOjE2MDU3ODk5NTksImV4cCI6MTYwNjk5OTU1OX0.HLrFKNODTcsXxCRVPj6tDmxMbaMt0RkSF7LQLsmuMhw",
                    }
                })
            if (response.ok) {
                alert('Comments saved!')
                this.setState({
                    comments: {
                        comment: '',
                        rate: '1',
                        elementId: '',
                    },
                    errMessage: '',
                    loading: false,
                })
            } else {
                console.log('an error occurred')
                let error = await response.json()
                this.setState({
                    errMessage: error.message,
                    loading: false,
                })
            }
        } catch (e) {
            console.log(e) // Error
            this.setState({
                errMessage: e.message,
                loading: false,
            })
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.errMessage && (
                        <Alert variant="danger">
                            We encountered a problem with your comment
                            {this.state.errMessage}
                        </Alert>
                    )
                }
                {
                    this.state.loading && (
                        <div className="d-flex justify-content-center my-5">
                            Commenting your book, please wait
                            <div className="ml-2">
                                <Spinner animation="border" variant="success" />
                            </div>
                        </div>
                    )
                }
                <Form className="w-100 mb-5" onSubmit={this.submitComments}>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label htmlFor="comment">Comment</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="comment"
                                    id="comment"
                                    placeholder="Please type your comment here"
                                    value={this.state.comments.name}
                                    onChange={this.updateCommentsField}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    
                    </Row>
                    <Row>
                        <Col md={5}>
                            <Form.Group>
                                <Form.Label htmlFor="rate">
                                    Please rate the book
                            </Form.Label>
                                <Form.Control
                                    as="select"
                                    name="rate"
                                    id="rate"
                                    value={this.state.comments.rate}
                                    onChange={this.updateCommentsField}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>

                                </Form.Control>
                            </Form.Group>
                        </Col>
                    
                      
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label htmlFor="elementId">Special requests</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="elementId"
                                    id="elementId"
                                    placeholder="Enter element Id"
                                    value={this.state.comments.elementId}
                                    onChange={this.updateCommentsField}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default CommentForm