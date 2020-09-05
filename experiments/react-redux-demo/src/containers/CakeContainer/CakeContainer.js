import React from 'react';
import { connect } from 'react-redux';

import { buyCake } from '../../store';

const CakeContainer = (props) => {
  return (
    <div>
      <h1>Using connect() HOC from react-redux</h1>
      <h2>Number of cakes - {props.numberOfCakes}</h2>
      <button onClick={props.buyCake}>Buy Cake</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    numberOfCakes: state.cake.numberOfCakes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyCake: () => dispatch(buyCake())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer);
