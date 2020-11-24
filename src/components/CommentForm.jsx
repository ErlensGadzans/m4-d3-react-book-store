import React from "react"

import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'

class CommentForm extends React.Component {
    state = {
        comment: {
            comment: "",
            rate: 1,
            elementId: "",
        },
        errMessage: '',
        // loading: false
    }

    updateCommentField = (e) => {
    
        this.setState({ comment: { ...this.state.comment,[e.target.name]:e.target.value } });
      };
       


    submitComment = async (e) => {
        e.preventDefault();
      
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/',
                {
                    method: 'POST',
                    body: JSON.stringify({...this.state.comment,elementId:this.props.book.asin}),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NjkwNjk4MzViMDAwMTc1ODRlZTgiLCJpYXQiOjE2MDYxNDA5NDEsImV4cCI6MTYwNzM1MDU0MX0.IuDgLHaiE7BYcl4ARCAKjytLKhnDhRWxQB3RxOpPqSM",
                    }
                })
            if (response.ok) {
                alert('Comments saved!')
                this.setState({
                    comment: {
                        comment: "",
                        rate: 1,
                        elementId: "",
                    },
                 
                })
                this.props.fetchComments()
            } else {
                console.log('an error occurred')
                
            }
        } catch (e) {
            console.log(e) 
      
        }
    }

    render() {
        return (
            
               
                <Container id="AddComment">
                      <h5>Add Comment:</h5>
                <Form className="w-100 mb-5" onSubmit={this.submitComment}>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label  htmlFor="comment">Comment:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="comment"
                                    placeholder="Please type your comment here"
                                    value={this.state.comment.comment}
                                    onChange={this.updateCommentField}
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
                                   
                                    value={this.state.comment.rate}
                                    onChange={this.updateCommentField}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    
                      
                    </Row>
                  
                    <Button type="submit">Submit</Button>
                </Form>
                </Container>
        )
    }
}

export default CommentForm