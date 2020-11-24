import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Dropdown,
  DropdownButton,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import fantasy from "../Data/fantasy.json";
import horror from "../Data/horror.json";
import history from "../Data/history.json";
import romance from "../Data/romance.json";
import scifi from "../Data/scifi.json";
import Comments from "./Comments"
let bookCategories = ["fantasy", "horror", "history", "romance", "scifi"];
let books = {
  fantasy,
  horror,
  history,
  romance,
  scifi,
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: books.fantasy,
      categorySelected: "fantasy",
      book:false
    };
  }

  handleDropdownChange = (category) => {
    this.setState({
      books: books[category].slice(0, 8),
      categorySelected: category,
    });
  };

  handleSearchQuery = (searchQuery) => {
    let category = this.state.categorySelected;

    if (searchQuery) {
      let filteredBooks = books[category].filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      this.setState({ books: filteredBooks.slice(0, 4) });
    } else {
      this.setState({ books: books[category].slice(0, 4) });
    }
  };

  render() {
    const {book} = this.state
    return (
      <div>
        <Container fluid>
          <InputGroup>
            <DropdownButton
              as={InputGroup.Prepend}
              id="dropdown-basic-button"
              className="mb-3"
              title={this.state.categorySelected}
            >
              {bookCategories.map((category, index) => {
                return (
                  <Dropdown.Item
                    href="#/action-1"
                    key={`dropdown-category-${index}`}
                    onClick={() => this.handleDropdownChange(category)}
                  >
                    {category}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            <FormControl
              placeholder="Search Books by Title"
              aria-label="Search"
              aria-describedby="basic-addon1"
              onChange={(e) => this.handleSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Container fluid>
          <Row className={'row-cols-sm-1 row-cols-lg-2'}>
            <Col >
              <Row>
                {this.state.books ? (
                  this.state.books.map((book) => {
                    return (
                      <Col onClick={()=>this.setState({book})} xs={12} key={book.asin}>
                        <Card style={{ width: "20rem" }}>
                          <Card.Img
                            variant="top"
                            src={book.img}
                        
                          />
                          <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text>€{book.price}</Card.Text>
                            <Button
                              onclick="myFunction(submitComment)"
                              variant="primary"
                            >
                              Leave the comment
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })
                ) : (
                  <div> nothing here </div>
                )}
              </Row>
            </Col>
            <Col>
            {book ? <Comments book={book} />:<p>Click  any book to see comments</p>}
            </Col>
          </Row>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Home;
