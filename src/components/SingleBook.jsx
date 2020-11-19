import React from "react";
import { Card } from "react-bootstrap";
import CommentArea from "./CommentArea";
import "./SingleBook.css";

class SingleBook extends React.Component {
  state = {
    selected: false,
  };

  toggleSelected = () => {
    if (this.state.selected === false) {
      this.setState({ selected: true });
    } else {
      this.setState({ selected: false });
    }
  };

  render() {
    return (
      <>
        <Card
          onClick={() => this.toggleSelected()}
          style={{ width: "16rem", zIndex: "2" }}
          className={
            this.state.selected === true
              ? "cardSelected mx-auto my-3"
              : "mx-auto my-3"
          }
        >
          <Card.Img variant="top" src={this.props.book.img} />
          <Card.Body>
            <Card.Title>{this.props.book.title}</Card.Title>
            <Card.Text>${this.props.book.price}</Card.Text>
          </Card.Body>
        </Card>
        <CommentArea
          className={
            this.state.selected === true
              ? "position-fixed"
              : "position-fixed d-none"
          }
          bookId={this.props.book.asin}
          bookImg={this.props.book.img}
        />
      </>
    );
  }
}

export default SingleBook;
