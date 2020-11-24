import React from "react";
import CommentForm from "./CommentForm";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";

class Comment extends React.Component {
  state = {
    comments: [],
  };
  componentDidMount() {
    this.fetchComments();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.book.asin !== this.props.book.asin) {
      this.fetchComments();
    }
  }
  fetchComments = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.book.asin,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NjkwNjk4MzViMDAwMTc1ODRlZTgiLCJpYXQiOjE2MDYxNDA5NDEsImV4cCI6MTYwNzM1MDU0MX0.IuDgLHaiE7BYcl4ARCAKjytLKhnDhRWxQB3RxOpPqSM",
          },
        }
      );
      if (response.ok) {
        const comments = await response.json();
        this.setState({
          comments,
        });
      } else {
        console.log("an error occurred");
   
      }
    } catch (e) {
      console.log(e); 
    }
  };

  render() {
    const { comments } = this.state;
    return (
      <div className="mb-5">
      
      <CommentForm fetchComments={this.fetchBooks} book={this.props.book} />
      {this.state.comments.map((comments, index) => (
          <ListGroup key={index}>
              <ListGroup.Item>
              <b>Name:</b> {comments.author}, <b>Comment:</b> {comments.comment}, <b>Rating:</b> {comments.rate}
              </ListGroup.Item>
          </ListGroup>
      ))  }
  </div>

    );
  }
}

export default Comment;
