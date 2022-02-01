import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import consts from "../constants/consts";
import "./Card.css";

type Props = {
  post: any;
};

const Card: FC<Props> = ({ post }): JSX.Element => {
  const [click, setClick] = useState(false);
  const className = click ? "btn touched" : "btn";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleTouched = () => {
    setClick(!click);
    console.log(post.title);
    navigate("/details", { state: { post } });
  };

  const handleMouseUp = () => {
    // Handle smooth animation when clicking without holding
    setTimeout(() => {
      setClick(false);
    }, 150);
  };

  dispatch({ type: consts.SET_POST, data: post });

  return (
    <button className={className} onMouseDown={toggleTouched} onMouseUp={handleMouseUp}>
      <div className="container">
        <div>
          <div>
            <p className="text">Title: {post.title}</p>
          </div>
          <div>
            <p className="text">URL: {post?.url}</p>
          </div>
          <div>
            <p className="text">Created at: {post.created_at}</p>
          </div>
          <div>
            <p className="text">Author: {post?.author}</p>
          </div>
        </div>
      </div>{" "}
    </button>
  );
};

export default Card;
