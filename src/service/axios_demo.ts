import axios from 'axios'

axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'why',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })
