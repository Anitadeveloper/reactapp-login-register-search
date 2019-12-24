import React, {Component} from 'react';
import { Redirect} from "react-router-dom";
import { getdataListing } from './UserFunctions';
import { Table } from "react-bootstrap";

class Details extends Component {
  constructor(props){
    super(props)
    this.state = {
      data:[],
      datalistloaded:false
    }
}

componentDidMount(){
  
  getdataListing(this.props.match.params.address).then(res => {
    
    if(res !== undefined){
      this.setState({
        data:res,
        datalistloaded:true
      })
    }
    else{
      this.props.history.push('/')
    }
  })
}


render() {
  if(!localStorage.usertoken){
    return <Redirect to='/' />
  }
  else{
   
    const get_data_list =this.state.data;
    const datalistLoaded = this.state.datalistloaded;
    
    const get_data_list_length = Object.keys(get_data_list).length;
    const data_list_display = Object.keys(get_data_list).map((d1, key1) => {
        if(key1 === 0){
          key1 = 1;
        }
        else{
          key1 = key1+1;
        }
        return (
              <tr key={key1}>
                  <td>{key1}</td>
                  <td>{get_data_list[d1].address}</td>
                  <td>{get_data_list[d1].building_name}</td>
                  <td>{get_data_list[d1].date_of_listing}</td>
                  <td>{get_data_list[d1].unit}</td>
                  <td>{get_data_list[d1].rent}</td>
                  <td>{get_data_list[d1].beds}</td>
                  <td>{get_data_list[d1].baths}</td>
                  <td>{get_data_list[d1].area}</td>
                  <td>{get_data_list[d1].not_used}</td>
                  <td>{get_data_list[d1].agent}</td>
                  <td>{get_data_list[d1].agency}</td>
                  <td>{get_data_list[d1].building_first_unit}</td>
                  <td>{get_data_list[d1].building_first_url}</td>
                  <td>{get_data_list[d1].url}</td>
                  <td>{get_data_list[d1].url_link}</td>
              </tr>
          );
    });
  return (
    <div className="container-fluid">
      <div className="jumbotron mt-5 colorwhite">
        <div className="col-sm-4 mx-auto">
          <h1 className="text-center">Buildings Listing</h1>
        </div>
        <a href="/#dashboard" className="btn btn-small action back_anchor">Back</a>
        <Table>
          <thead>
              <tr>
              <th>#</th>
                    <th>Address</th><th>Building Name</th>
                    <th>Date Of Listing</th><th>Unit</th>
                    <th>Rent</th><th>Beds</th>
                    <th>Baths</th><th>Area</th>
                    <th>Not Used</th><th>Agent</th><th>Agency</th>
                    <th>Building First Unit</th>
                    <th>Building First Url</th><th>Url</th>
                    <th>Url Link</th>
              </tr>
          </thead>
              { (datalistLoaded === false ) ?
              (<tbody><tr><td colSpan='10'>Please wait while loading the data...<img src="/loading.gif"  height='50px' alt="" /></td></tr></tbody>) :
              (get_data_list_length === 0 )?
              (<tbody><tr><td colSpan='10'>No data found...</td></tr></tbody>) :
              <tbody>
               { data_list_display }
             </tbody>}
        </Table>
      </div>
    </div>
  )
}
}
}
export default Details;
