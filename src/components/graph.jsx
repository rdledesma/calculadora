import React, {useState, useEffect} from 'react';
// import { LineChart} from 'react-chartkick'
import 'chart.js'

import { Line } from 'react-chartjs-2';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, LineSeries, HorizontalGridLines,
  VerticalGridLines, LineMarkSeries} from 'react-vis';
import { forEach } from 'mathjs';


export default function Graph(props){

    const {dataInclinada, dataParalela} = props
    
    const calcularInclinanda = () => {
      let data = [];

      for (let index = 0; index < 24; index++) {
        const element = dataInclinada[index];
          data.push({ x:index , y: element>0 ? element : 0})
      }
      return data;
    }
    
    const calcularParalela = () => {
      let data = [];

      for (let index = 0; index < 24; index++) {
        const element = dataParalela[index];
          data.push({label: 'woah!' ,x:index , y: element>0 ? element : 0})
      }
      return data;
    }


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
            <div style={{}} >
              <h4 style={{color:'blue', display:'inline'}}>Irradiancia Inclianda</h4>
              <h4 style={{color:'red', display:'inline'}}> Irradiancia Paralelo</h4>

            </div>
              <XYPlot height={600} width={800}  yDomain={[0, 1500]}  >
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis  title={"Horas"} tickValues={[0, 1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]}/>
                <YAxis title={"Irradiancia"} />
                <LineMarkSeries
                  style={{strokeWidth: '3px'}} 
                  className="linemark-series-example-2"
                  curve={'curveMonotoneX'} 
                  lineStyle={{stroke: 'blue'}}
                  markStyle={{stroke: 'blue'}} 
                  data={calcularInclinanda()} />


                <LineMarkSeries 
                  
                  style={{strokeWidth: '3px'}} 
                  lineStyle={{stroke: 'red'}}
                  markStyle={{stroke: 'red'}} 
                  className="linemark-series-example"  
                  data={calcularParalela() }  />

              </XYPlot>

        </div>

    );
}