import React from "react";
import { connect } from "react-redux";

const Details = (posts: any): JSX.Element => {
  return (
    <div className="container">
      <h5 className="card">{JSON.stringify(posts, null, "\t")}</h5>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  posts: state.reducer.activePost,
});

export default connect(mapStateToProps)(Details);
