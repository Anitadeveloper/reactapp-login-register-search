import axios from 'axios';
import config from 'react-global-configuration';

export const register = newUser => {
  var api_url = config.get('baseUrl')+'/register';
    return axios
    .post(api_url, newUser, {
          headers : {'Content-Type' : 'application/json'}
      })
      .then(res => {
        return res.data
        //console.log(res)
      })
      .catch(err => {
        if(newUser.first_name === '' || newUser.last_name==='' || newUser.email === '' || newUser.password ===''){
          console.log("Please fill the credentials...");
        }
        else{
          console.log(err)
        }
      })
    
}


export const login = user => {
 
  var api_url = config.get('baseUrl')+'/login';
  return axios
    .post(api_url, {
      email : user.email,
      password: user.password
    }, {
        headers : {'Content-Type' : 'application/json'}
    })
    .then(res => {
      localStorage.setItem('usertoken', res.data.token)
        return res.data
      // window.location='/dashboard';
    })
    .catch(err => {
      if((user.email.length || user.password.length === 0)  && user.email === '' && user.password === ''){
        //console.log("Please fill the credentials...");
        return 'Please fill the credentials...';
      }
      else {
        //console.log("invalid_credentials");
        return 'invalid_credentials';
        //console.log(err)
      }
      
    })
  
}


export const getProfile = () => {
  var api_url = config.get('baseUrl')+'/profile';
  return axios
  .get(api_url, {
        headers : { Authorization : `Bearer` + localStorage.getItem('usertoken') }
    })
    .then(res => {
      //console.log(res);
      return res.data
    })
    .catch(err => {
     // console.log("err")
    })
  
}

export const getSEDataSummary  = (limit) => {
  var api_url = config.get('baseUrl')+'/sedatasummary/'+limit;
  return axios
  .get(api_url, {
        headers : { Authorization : `Bearer` + localStorage.getItem('usertoken') }
    })
    .then(res => {
      if(localStorage.usertoken!==undefined){
        return res.data
      }
      else{
        this.props.history.push('/')
      }
     
    })
    .catch(err => {
      //console.log(err)
    })
  
}
export const countTotal  = () => {
  var api_url = config.get('baseUrl')+'/counttotal';
  
  return axios
  .get(api_url, {
        headers : { Authorization : `Bearer` + localStorage.getItem('usertoken') }
    })
    .then(res => {
      return res.data[0].total;
    })
    .catch(err => {
      //console.log(err)
    })
  
}
export const getCompanies  = (address) => {
  var api_url = config.get('baseUrl')+'/sedatacompanies/';
  return axios
  .get(api_url+address, {
        headers : { Authorization : `Bearer` + localStorage.getItem('usertoken') }
    })
    .then(res => {
     // console.log(res)
      return res.data
    })
    .catch(err => {
      //console.log(err)
    })
  
}

export const getdataListing  = (address) => {
  var api_url = config.get('baseUrl')+'/sedatalisting/';
  return axios
  .get(api_url+address, {
        headers : { Authorization : `Bearer` + localStorage.getItem('usertoken') }
    })
    .then(res => {
      
      if(localStorage.usertoken!==undefined){
        return res.data
      }
      else{
        this.props.history.push('/')
      }
    })
    .catch(err => {
     // console.log(err)
    })
  
}


export const search_counttotal  = (searchaddress) => {
  var api_url = config.get('baseUrl')+'/search_counttotal/';
  return axios
  .get(api_url+searchaddress, {
        headers : { Authorization : `Bearer` + localStorage.getItem('usertoken') }
    })
    .then(res => {
      return res.data[0].total;
    })
    .catch(err => {
      //console.log(err)
    })
  
}

export const getexactsearch  = (search_query) => {
  var api_url = config.get('baseUrl')+'/searchapi';
   return axios
    .get(api_url+search_query, {
         headers : { Authorization : `Bearer` + localStorage.getItem('usertoken') }
     })
     .then(res => {
       let result;
      (res.data.length === 0)?result='No data Found':result=res.data;
         return result
      
     })
     .catch(err => {
     //  console.log(err)
     })
 }

// export const getNeighbours  = () => {
//   var api_url = config.get('baseUrl')+'/getneighbour';
//   return axios
//   .get(api_url, {
//         headers : { Authorization : `Bearer` + localStorage.getItem('usertoken') }
//     })
//     .then(res => {
//      // console.log(res)
//       return res.data
//     })
//     .catch(err => {
//       //console.log(err)
//     })
  
// }