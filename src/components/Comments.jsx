import React from "react";

import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import CommentForm from "./CommentForm";
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
        // let error = await response.json()
        // this.setState({
        //     errMessage: error.message,
        //     // loading: false,
        // })
      }
    } catch (e) {
      console.log(e); // Error
      // this.setState({
      //     errMessage: e.message,
      //     // loading: false,
      // })
    }
  };

  render() {
    const { comments } = this.state;
    return (
      <div>
        <CommentForm 
        fetchComments={this.fetchComments}
        book={this.props.book} />
        {JSON.stringify(comments)}
      </div>
    );
  }
}

export default Comment;
