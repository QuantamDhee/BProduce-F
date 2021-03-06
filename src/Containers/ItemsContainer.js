import ItemCard from "../Components/ItemCard";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";

const ItemsContainer = ({ items }) => {
  return (
    <div>
      <div className="ui fluid search">
        {/* <div className="ui icon input">
          <input className="prompt" type="text" placeholder="Search..." />
          <i className="search icon"></i>
        </div> */}
      </div>
      <br />
      <div className="centered ui cards">
        {items.map((item) => (
          <ItemCard key={item.id} item={item}  />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps)(ItemsContainer);
