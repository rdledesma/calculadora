import React, {useState, useEffect} from 'react';
import { LineChart} from 'react-chartkick'
import 'chart.js'


export default function Graph(props){

    const {dataInclinada, dataParalela} = props

    

    const data = [
        {"name":"Plano Inclinado", "data": {...dataInclinada}},
        {"name":"Plano Paralelo", "data": {...dataParalela}},

      ];
    return (
        
        <div>
            <LineChart xtitle="irradiancia solar" ytitle="Horas" data={data} min={0} max={1500} />
        </div>

    );
}