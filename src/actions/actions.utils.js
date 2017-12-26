import axios from 'axios';

export default function get(type, url) {
  return function(dispatch) {
    axios.get(url).then(rsp => {
      dispatch({
        type,
        data: rsp.data,
      });
    });
  };
}
