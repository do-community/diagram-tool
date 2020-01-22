
function mode(state = [], action) {
  switch(action.type) {
  	case 'INITIALIZE' :
  	  return 'Build';
    case 'CHANGE_MODE' :
      //return updated state
      console.log('CHANGE_MODE');
    default:
      return state;
  }
}

export default mode;
