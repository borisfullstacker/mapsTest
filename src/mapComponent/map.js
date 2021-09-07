

import { ReactBingmaps } from 'react-bingmaps';
import CoordinateForm from './coordinateForm';
import './MapStyle.css';
import React, { useState } from "react";

function MapMainPage() {
let center =[]
let [pins, setPins] = useState([]);
let [lines, setLines] = useState({
    "location":[],
     "option": { strokeColor: 'blue', strokeThickness: 3 }
});


const bingKey = 'AlHCVtxjwHDe_IihUdQ02HsJf6joat-w87p9683IenoJ_yaFhTHmv0mqrg-8vLBX'


const followCoordChange = ({longitude,latitude}) =>{
    if(longitude && latitude){
        
        const lo = parseFloat(longitude)
        const la = parseFloat(latitude)
        center = [lo,la]
        let lineObj = Object.assign({},lines)
        
        let pinArr =pins.slice()
        pinArr.push({
            "location":[lo,la],
            "option":{ color: 'red' }
        })
        
        if(lineObj.location.length === 0){
            lineObj.location.push([lo,la],[lo,la])
        }else{
            let lineArr = lineObj.location.slice(0,-1)
            lineArr.push([lo,la],lineArr[0])
            lineObj.location = lineArr;



        }

        setLines(lineObj) 
        setPins(pinArr)
    }
}
  

  return (
    <div>
            <div  className = 'map-container'>
            <header>
                <h3>
                    מבחן
                </h3>

            </header>
            <CoordinateForm coordChange={(value)=>followCoordChange(value)}>                   
             </CoordinateForm>
             <ReactBingmaps    
                zoom = {3}
                polyline= {lines}
                center = {center}
                pushPins = {pins}           
                bingmapKey = {bingKey}> 
             </ReactBingmaps>
 
            </div>  
    </div>
  );
}

export default MapMainPage;
