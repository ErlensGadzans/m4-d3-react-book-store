import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import CommentForm from "./CommentForm"
import './NavBar.css';

class ModalForm extends React.Component {
  state = {
    show: false,
    books: this.props.data ? this.props.data : {},
  };

  onChangeHandler = (e) => {
    this.setState({
      books: {
        ...this.state.books,
        [e.target.id]: e.target.value,
      },
    });
  };

  handleSubmit = async () => {
    const url =
      this.props.method === "PUT"
        ? "https://striveschool-api.herokuapp.com/api/comment" +
          this.props.data.bookId
        : "https://striveschool-api.herokuapp.com/api/comment";
    try {
      const response = await fetch(url, {
        method: this.props.method,
        body: JSON.stringify(this.state.books),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NjkwNjk4MzViMDAwMTc1ODRlZTgiLCJpYXQiOjE2MDU3ODk5NTksImV4cCI6MTYwNjk5OTU1OX0.HLrFKNODTcsXxCRVPj6tDmxMbaMt0RkSF7LQLsmuMhw",
        }),
      });
      if (response.ok) {
        alert("ok");
        this.props.refetchData();
        this.setState({ show: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        <Button variant="success" onClick={() => this.setState({ show: true })} className="button-modal">
          +
        </Button>

        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          
        >
          <Modal.Header closeButton
          >
            <Modal.Title>{this.state.books}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CommentForm id={this.state.books}/>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default ModalForm;