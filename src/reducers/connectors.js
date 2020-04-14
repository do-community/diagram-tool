function connectors(state = [], action) {
  switch(action.type) {
    case 'INITIALIZE' :
      return action.data.connectors && action.data.connectors.length ? action.data.connectors : [];
    case 'ADD_CONNECTOR' :
      return [
        ...state,
        {
          type: action.connectorType,
          metadata:action.metadata,
          between: [action.start, action.end]
        }
      ];
    case 'EDIT_CONNECTOR' :
      return state.map((c,i) => {
        if(i === action.key) {
          return {...c, metadata:{...c.metadata, ...action.metadata}};
        }
        return c;
      });

    case 'EDIT_connectorType' :
      return state.map((c,i) => {
        if(i === action.key) {
          return {...c, type:action.connectorType};
        }
        return c;
      });

    case 'DELETE_CONNECTOR' :
      return state.filter(function(c, i) { console.log(i, action.key); return i !== action.key; });
    case 'DELETE_ATTACHED_CONNECTORS':
      return state.filter(function(c) { return c.between.indexOf(action.key) === -1; });
    default:
      return state;
  }
}

export default connectors;
