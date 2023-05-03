import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";
export interface IPropsButton{
  onClick:Function;
  backgroundColor:string;
  children:string |React.ReactElement| Array<React.ReactElement|string>;
  styles?:{};
}
const Button = (props:any) => {
  const [isClicked, setIsClicked] = useState(false);
  //
  useEffect(() => {
    let descripteurTimeout = undefined;
    if (isClicked) {
      descripteurTimeout=setTimeout(() => {
        console.log('descente de state');
        setIsClicked(false);
      }, 2000);
    }
     return () => {
        if(descripteurTimeout){
          clearTimeout(descripteurTimeout);
        }
     };
  }, [isClicked]);
  return (
    <button
      style={{ ...props.style, backgroundColor: props.backgroundColor }}
      className={
        isClicked ? styles.Button + " " + styles.clicked : styles.Button
      }
      onClick={(evt) => {
        setIsClicked(true);
        console.log(evt);
        props.onClick("le roi albert");
      }}
    >
      {props.children}
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string,
  style: PropTypes.object,
};
Button.defaultProps = {
  children: "Hello",
  onClick: () => {},
  backgroundColor: "skyblue",
};
export default Button;