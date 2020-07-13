import React from 'react'
import Webcam from "react-webcam";
import ReactDOM from 'react-dom'
// eslint-disable-next-line
import {storage} from './fire'

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [url, setUrl] = React.useState("");

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc !== null){
      const uploadTask = storage.ref(`images/profile`);
      uploadTask.putString(imageSrc.split("").slice(23).join(""),"base64");
      uploadTask.getDownloadURL().then((dlUrl)=>{
        setUrl(dlUrl)
        //grap a refcence to the user and attach to him
      })
    }
  };

  return (
    <>
      <Webcam
          id= "webcam"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      
      <img
        src={url || "http://via.placeholder.com/300"}
        id="image"
        alt= "profile"
      />
      
    </>
    );
  };
  
  ReactDOM.render(<WebcamCapture />, document.getElementById("root"));

  export default WebcamCapture
  
  // https://www.npmjs.com/package/react-webcam
  
  
 
  