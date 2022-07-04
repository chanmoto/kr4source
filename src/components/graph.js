import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
import { fetchCrossvalidData } from '../api';

import GraphComponent from "./graphcomponent";

const GraphPage = () => {
  
  const graph = fetchCrossvalidData();


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
  return (
    <>
        <GraphComponent
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      } } />
    </>
  );
  
}

export default GraphPage