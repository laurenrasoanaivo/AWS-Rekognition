
import './Content.css';
import './responsive.css';
import AWS from 'aws-sdk';
import { useState } from 'react';
import AnonLog from './AnonLog';
import React from 'react';
import GridInfo from './GridInfo';
import ArrayInfo from './ArrayInfo';

export default function Content() {

  const [getInfo, setGetInfo] = useState<AWS.Rekognition.DetectFacesResponse>();

  function processImage(fichier: File, callback: (el: ArrayBuffer) => void) {
    new Response(fichier).arrayBuffer().then(callback)
  }

  function DetectFace(e: ArrayBuffer) {
    AnonLog();
    var rekognition = new AWS.Rekognition();
    var params = {
      Image: {
        Bytes: e
      },
      Attributes: [
        'ALL',
      ]
    };
    rekognition.detectFaces(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        console.log(data);
        setGetInfo(data);
      }
    });
  }

  var src;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e?.target?.files != null) {
      let file = e?.target?.files[0]
      src = URL.createObjectURL(file);
      var preview = document.getElementById("blah") as HTMLImageElement;
      const imgUp = document.getElementById("imgUp");
      const textI = document.getElementById("textI");
      if (preview != null && imgUp != null && textI != null) {
        preview.src = src;
        imgUp.style.border = 'none';
        imgUp.style.height = 'auto';
        imgUp.style.backgroundColor = 'white';
        textI.parentNode?.removeChild(textI);
      }
      processImage(file, DetectFace);
    }
  }

  return (
    <>
      <div className='form-input'>
        <form>
          <label htmlFor='imgInp'>UPLOAD IMAGE</label>
          <input
            type="file"
            accept='image/*'
            onChange={(e) => handleChange(e)}
            id="imgInp"
          >
          </input>
        </form>
      </div>
      <div className='container'>
        <div id='imgUp'>
          <p id='textI'>Image</p>
          <img id="blah"></img>
        </div>
        <div className='infoContent'>
          <h2>Face details</h2>
          <div className='faceDetails'>
            <div className='detailInfo'>
              {getInfo?.FaceDetails?.map(titleItem => Object.keys(titleItem)
                .map((item, index) => {
                  if (item === "BoundingBox" || item === "AgeRange" || item === "Emotions" || item === "Landmarks" ||
                    item === "Pose" || item === "Quality" || item === "Confidence" || item === "Gender") {
                    return ""
                  }
                  return (
                    <li key={index}>
                      <GridInfo item={item}
                        confidence={(titleItem as { [key: string]: { "Confidence": number } })[item]["Confidence"]}
                        value={(titleItem as { [key: string]: { "Value": boolean } })[item]["Value"]}
                      />
                    </li>
                  )
                })
              )}
            </div>
            <div className='generalInfo'>
              {getInfo?.FaceDetails?.map(titleItem => <ul><h3>Gender :
                <span
                  style={{ color: titleItem.Gender?.Value == 'Male' ? '#7fc3c0' : 'hotpink' }}
                > {titleItem.Gender?.Value}</span></h3></ul>)}
              {getInfo?.FaceDetails?.map(titleItem => (
                <ul>
                  <div className="dropdown">
                    <button className="dropbtn">Age</button>
                    <div className="dropdown-content">
                      <li key={1}>
                        {`LOW: ${titleItem.AgeRange?.Low}`}
                      </li>
                      <li key={2}>
                        {`HIGH : ${titleItem.AgeRange?.High}`}
                      </li>
                    </div>
                  </div>
                </ul>
              ))}
              {getInfo?.FaceDetails?.map(titleItem => (
                <ul>
                  <div className="dropdown">
                    <button className="dropbtn">Emotion</button>
                    <div className="dropdown-content">
                      {titleItem.Emotions?.map((items, index) =>
                        <li key={index}>
                          <ArrayInfo
                            type={items.Type}
                            confidence={items.Confidence}
                          />
                        </li>
                      )}
                    </div>
                  </div>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )

}