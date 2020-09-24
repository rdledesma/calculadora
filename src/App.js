import React, {useState, useEffect} from 'react';

import './App.css';
import Graph from './components/graph';
import {cos, sin, acos, abs, gre} from 'mathjs'


function App() {

  const [data, setData] = useState(
    {
      lat : '',
      long: '',
      jul: '',
      elev: '',
      azit: ''
    }
  )

  const [dataInclinada, setDataInclinada] = useState([])
  const [dataParalela, setDataParalela] = useState([])


  const handleInput = (e) => {
   
    setData({...data, [e.target.id] :e.target.value});
  }
  
  const PI = 3.14159265358979323;
  
  const radians = (angle) => {
    return angle * (PI / 180);
  }

  function degrees (angle) {
    return angle * (180 / Math.PI);
  }

  const SIGNO = (x) => {
    if (x===0) {
      return 0;
    }
    if (x>0) {
      return 1;
    }
    if (x<0) {
      return -1
    }
  }
  
  
  const COS0 = (N, V, O, Q, W)=>{
    console.log("N",N, "V",V, "O",O, "Q",Q, "W",W);
    if(N <= 0){
      return 0;
    }
    else{
      return N * cos(V) + sin(O) * sin(V) * cos(Q - radians(W))
    }
      
  }

  const irradianciaInclinado = (W, X, Y) => {
    if (W < 0)
        return 0
    else
        return X * Y * W
  }

  const irradianciaParalelo = (X, Y, M) => {
    if (M < 0)
        return 0
    else
        return X * Y * M
  }



  
  const dataIrradianciaInclinado = []
  const dataIrradianciaParalelo = []
  const TSIs = 1367;

  const IrradianciaInc = () => {
    const anguloDiario = 2 * PI * (data.jul - 1) / 365;
    const ecuacionTiempo = (0.000075 + 0.001868 * cos(anguloDiario) - 0.032077 * sin(anguloDiario) - 0.014615 * cos(2 * anguloDiario) - 0.04089 * sin(2 * anguloDiario)) * 229.2;    
    const declinacion = 23.45 * sin(radians(360 * (284 + parseInt(data.jul))) / 365)



    const declinacionRadianes = radians(declinacion);
    const EOs = 1 + 0.033 * cos(2 * PI * data.jul / 365);
    
    const elevacionRadianes = radians(data.elev);
    const latRadianes = radians(data.lat)


    
    

    for (let x = 0; x < 24; x++) {
      let horaReloj = x;

      const horaSolar = horaReloj + (4 * (45 - data.long) + ecuacionTiempo) / 60
      const anguloHorario = 15 * (12 - horaSolar)
      const anguloHorarioRadianes = radians(anguloHorario)
      const cosOz = (cos(latRadianes) * cos(declinacionRadianes) * cos(anguloHorarioRadianes)) + (sin(latRadianes) * sin(declinacionRadianes));
      const OzRadianes = acos(cosOz);

      console.log("M", anguloHorarioRadianes);
      console.log("N", cosOz);
      console.log("C", latRadianes);
      console.log("K", declinacionRadianes);
      console.log("O", OzRadianes);
      console.log("C", latRadianes);


      const azimutDelSol = SIGNO(anguloHorarioRadianes) * (abs(acos((cosOz * sin(latRadianes) - sin(declinacionRadianes)) / (sin(OzRadianes) * cos(latRadianes)))))
      const azimutDelSolGrados = degrees(azimutDelSol)
      //const cosO = COS0(cosOz, elevacionRadianes, OzRadianes, azimutDelSol, parseFloat(data.azit))
      const cosO = COS0(cosOz, elevacionRadianes, OzRadianes, azimutDelSol, parseFloat(data.azit))
      
      dataIrradianciaInclinado.push(irradianciaInclinado(TSIs, EOs, cosO))
      dataIrradianciaParalelo.push(irradianciaParalelo(TSIs, EOs, cosOz))


      setDataInclinada(dataIrradianciaInclinado)
      setDataParalela(dataIrradianciaParalelo)

      

    }
    
    
  }
  
    useEffect(() => {
      IrradianciaInc();
    }, [data])

  
    
    // 

    // 
    // 
    // 
    // for x in range(24):

    //     
    //     azimutDelSol = SIGNO(anguloHorarioRadianes) * (math.fabs(
    //         ACOS((cosOz * SENO(latRadianes) - SENO(declinacionRadianes)) / (SENO(OzRadianes) * COS(latRadianes)))))
    //     azimutDelSolGrados = math.degrees(azimutDelSol)
    //     cosO = COS0(cosOz, elevacionRadianes, OzRadianes, azimutDelSol, azimutGrados)

    //     # print(irradianciaInclinado(TSIs,EOs, cosO))
    //     dataIrradianciaInclinado.append(irradianciaInclinado(TSIs, EOs, cosO))
    //     dataIrradianciaParalelo.append(irradianciaParalelo(TSIs, EOs, cosOz))






  return (
    <div className="App">
      <div className="row container">
        <div className="col text-center">
        <h1 className="text-center">Irradiancia</h1>
        
        </div>
      </div>
      <div className="row m-2">
        <div className="col-4">
        <div  className="p-2">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Latitud</label>
            <div class="col-sm-4">
              <input  class="form-control" type="number" onChange={e => handleInput(e)} placeholder="Lat" id="lat" value={data.lat}/>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Longitud</label>
            <div class="col-sm-4">
              <input class="form-control" type="number" onChange={e => handleInput(e)} id="long" value={data.long} placeholder="Long"/>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Día Juliano</label>
            <div class="col-sm-4">
              <input class="form-control" type="number" onChange={e => handleInput(e)} id="jul" value={data.jul} placeholder="Día"/>
            </div>
          </div>
          </div>

          <div  className="p-2 mt-2">
          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Elevación en grados</label>
            <div class="col-sm-4">
              <input class="form-control" type="number" onChange={e => handleInput(e)} id="elev" value={data.elev} placeholder="Elevación"/>
            </div>
          </div>

          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Azimut del sol</label>
            <div class="col-sm-4">
              <input class="form-control" type="number" onChange={e => handleInput(e)} id="azit" value={data.azit} placeholder="Azimut"/>
            </div>
          </div>
          </div>
        </div>
        <div className="col-8">
          <Graph dataInclinada={dataInclinada} dataParalela={dataParalela}></Graph>
        </div>
      </div>

    </div>
  );
}

export default App;
