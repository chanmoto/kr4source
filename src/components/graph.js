import React,{useState,useEffect} from "react";
import { fetchCrossvalidData } from '../api';
import CrossValid from '../data/cross.json';
import GraphComponent from "./graphcomponent";

var url = 'https://api.github.com/graphql'
var query =  `
query { 
  repository(owner: "chanmoto", name: "kr4source") {
     object(expression: "master:src/data/cross.json") {
       ... on Blob {
         text
       }
     }
   }
 }
`

const loadJSON = key => key && JSON.parse(localStorage.getItem(key));
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const GraphPage = () => {

//  const graph = fetchCrossvalidData(CrossValid);
 const [dataa, setDataa] = useState(null);
 const [graph, setGraph] = useState(null);
 const token = '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'
 
 useEffect(() => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + token
    },
    body: JSON.stringify({ query: query })
  })
    .then(res => res.json())
    .then(({data})=> data.repository.object.text)
    .then(setDataa)
    .catch(console.error)}
    ,[]);
    
  if (dataa)  
    setGraph(fetchCrossvalidData(dataa));
  
  const options = {
      nodes: {
        scaling: {
          min: 32,
          max: 64,
        },
      },
      edges: {
        smooth: true,
      },
      physics: {
        barnesHut: { gravitationalConstant: -3000 },
        stabilization: { iterations: 2500 },
      },

    height: "1000px"
  };

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };
  if (!graph) return <p>loading...</p>;

  return (
      <div>
            <GraphComponent
            graph={graph}
            options={options}
            events={events}
            getNetwork={network => {
              //  if you want access to vis.js network api you can set the state in a parent component using this property
            } } />
      </div>
    );
}

export default GraphPage