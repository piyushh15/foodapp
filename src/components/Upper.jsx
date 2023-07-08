import React from "react";
import "./Upper.css";

const Upper = () => {
  return (
    <div id="container" className="bg-black bg-gradient">
      <div id="row">
        <div id="left">
          <h1> Our food depends on your mood</h1>
          <h2> Are you hungry?? Dont wait!!!</h2>
          <h3>Let's start to order food Now!!!</h3>
        </div>
        <div id="right">
          <div className="img">
            <img
              alt=""
              src="https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M="
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upper;
