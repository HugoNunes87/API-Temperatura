import React from "react";
import { useState } from "react";
import './App.css';
import Footer from './componentes/Footer/';




function App() {
  const [cidade, setCidade] = useState("São Paulo");
  const [previsãoDoTempo, setprevisãoDoTempo] = useState(null);



  const pesquisa = (t) => {
    // target > reconhece quem o solicitou e atraves do value > retiramos o valor
    setCidade(t.target.value)
  }

  const solicitarInformações = () => { // onde ira solitar as informações da api
    fetch
      (`http://api.weatherapi.com/v1/current&forecast.json?key=0bbacb04f23b43d58b2123548220803&q=${cidade}&lang=pt`
      ).then((resposta) => {
        //console.log('response >>>>', resposta) // > resposta da solicitação da cidade
        if (resposta.status === 200) { // verfica se a requisição deu certo
          return resposta.json()
        }
      })
      .then((data) => {
        // (data)Resultado da requisição da cidade
        setprevisãoDoTempo(data)
      });
  };


  return (
    <div >
      <nav className="navbar navbar-expand-md  mb-4" class="navbar" >
        <a className="navbar-brand text-white mx-auto" href="#top" >
          PREVISÃO DO TEMPO
        </a>
      </nav>

      <main className="container ">
        <div className="jumbotron">
          <h1>
            Verifique a previsão do tempo
          </h1>
          <p className="lead">
            Digite o nome da cidade no campo abaixo, e em seguida clique em pesquisar
          </p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                onChange={pesquisa}
                className="form-control"
                value={cidade}>

              </input>
            </div>
          </div>

          <button className="btn btn-primary btn-lg" onClick={solicitarInformações} >
            Pesquisar
          </button>

          {previsãoDoTempo ? ( // se algo estiver em (previsãoDoTempo) ele retorna a imagem se não ele retona nulo
            <div>
              <div className="mt-4 d-flex align-items-center">
                <div>
                  <img src={previsãoDoTempo.current.condition.icon}></img>
                </div>
                <div>
                  <h3>Condição do Dia: {previsãoDoTempo.current.condition.text}</h3>
                  <p className="lead">
                    Temp: {previsãoDoTempo.current.temp_c}° | Umidade {previsãoDoTempo.current.humidity}%
                  </p>
                  <p className="lead">
                    MIN {previsãoDoTempo.forecast.forecastday[0].day.mintemp_c}° | MAX {previsãoDoTempo.forecast.forecastday[0].day.maxtemp_c}°
                  </p>
                </div>
              </div>
            </div>
          ) : null}

        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;


