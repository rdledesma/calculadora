import React, {useState, useEffect} from 'react';
// import { LineChart} from 'react-chartkick'
import 'chart.js'

import { Line } from 'react-chartjs-2';
export default function Graph(props){

    const {dataInclinada, dataParalela} = props

    const data = {
        labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        datasets: [
          {
            label: "Plano Paralelo",
            data: dataParalela,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: "Plano Inclinado",
            data: dataInclinada,
            fill: false,
            borderColor: "#742774"
          }
        ]
      };

      const options = {
        title: {
          display: true,
          text: "Irradiancia"
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero:true,
                suggestedMin: 0,
                suggestedMax: 1500,
                min: 0,
              max: 1500 
              },
            }
            
          ]
        }
      };
    return (
        
        <div>
            {/* <LineChart xtitle="irradiancia solar" ytitle="Horas" data={data} min={0} max={1500} /> */}
        
            <Line data={data} options={options} min={0} max={1500}/>
        </div>

    );
}