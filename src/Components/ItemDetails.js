import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const reviewsAPI = "http://localhost:3000/api/v1/reviews";

class ItemDetails extends Component {
  state = {
    text: "",
    display: false,
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addReview = (e, item) => {
    e.preventDefault();
    fetch(reviewsAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        text: this.state.text,
        item_id: this.props.item.id,
      }),
    })
      .then((res) => res.json())
      .then((items) => {
        this.props.dispatch({ type: "ADD_REVIEW", items });
      });
  };

  render() {
    return (
      <div className="ui segment">
        <div className="ui two column centered grid">
          <div className="row">
            <div className="eight wide column">
              <img
                alt="oh no!"
                className="ui large rectangular image bordered"
                src={this.props.item.image}
              />
              {localStorage.getItem("token") && (
                <Link
                  onClick={() =>
                    this.setState({ display: !this.state.display })
                  }
                >
                  Leave A Review
                </Link>
              )}
              {localStorage.getItem("token") && this.state.display === true && (
                <div className="modal">
                  <Form onSubmit={this.addReview} className="form">
                    <Form.TextArea
                      label="Review"
                      style={{ fontColor: "red" }}
                      required
                      name="text"
                      placeholder="Write your review..."
                      onChange={this.handleInputChange}
                    />

                    <Button type="submit" positive className="ui mini button">
                      Submit
                    </Button>
                    <Button
                      onClick={() => this.setState({ display: false })}
                      positive
                      className="ui mini button"
                      style={{ backgroundColor: "red" }}
                    >
                      Close
                    </Button>
                  </Form>
                </div>
              )}
              <Link
                to={"/items"}
                
              >
                Back To Browse
              </Link>
            </div>
            <div className="four wide column">
              <h2>{this.props.item.name}</h2>
              <p>
                <br />
                <strong>Price: </strong>${this.props.item.price}
                <br />
                <strong>Description: </strong>{this.props.item.description}
              </p>
              <br />
              {localStorage.getItem("token") && (
                <button
                  className="ui button fluid"
                  onClick={() => this.props.addToCart(this.props.item)}
                >
                  Add to Cart
                </button>
              )}
              <div>
                <h4>Reviews:</h4>
                <ul>
                  {this.props.item.reviews.map((review) => (
                    <li key={review.id}>{review.text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(ItemDetails);
