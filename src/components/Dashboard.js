import React, { Component } from 'react';
// import ReactDOM from "react-dom";

// import {Button, Form, Container, Row, Navbar, Nav, NavDropdown, Table, Modal,} from "react-bootstrap";
import { Redirect} from "react-router-dom";
import { Table, Modal,} from "react-bootstrap";
import { search_counttotal,countTotal,getSEDataSummary,getCompanies,getexactsearch  } from './UserFunctions';
// import Details from './Listingdetails'

class Dashboard extends Component {
      constructor(props){
      super(props);      
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
     
      this.state = {
        data: false,
        dataloaded:false,
        datacomploaded:false,
        show: false,
        nextshow : false,
        data_comp: [],
        searchdata:[],
        query: '',
        results: {},
        loading: false,
        message: '',
        totalResults: 0,
        totalRecords:'',
			  totalPages: 0,
        currentPageNo: 0,
       // neighbours: [],
       // neighbour: "",
        currentPage: 1,
        todosPerPage: 100,
        searchloading:false,
        paginationloaded : false,
        searchparam:'',
        length_is_less_than_3:false,
        isActivepagination: false
      }

        this.cancel = '';
        // to close the dropdown on clickoutside
        this.setWrapperRef1 = this.setWrapperRef1.bind(this);
        this.setWrapperRef2 = this.setWrapperRef2.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.paginationClick = this.paginationClick.bind(this);
        /* select neighbourhood */ 
       // this.handleChangeneighbour = this.handleChangeneighbour.bind(this);
       // this.handleSubmitneighbour = this.handleSubmitneighbour.bind(this);

      this._onBlur = this._onBlur.bind(this)
      this._onFocus = this._onFocus.bind(this)
      this.handleKeyUp = this.handleKeyUp.bind(this)
     

    }

    // handleChangeneighbour = event => {
    //   this.setState({ neighbour: event.target.value });
    // };
    // handleSubmitneighbour(event) {
    //   alert("Your selected value is: " + this.state.neighbour);
    //   event.preventDefault();
    // }
    
    
    // getUnique(arr, comp) {
    //   const unique = arr
    //     //store the comparison values in array
    //     .map(e => e[comp])
    
    //     // store the keys of the unique objects
    //     .map((e, i, final) => final.indexOf(e) === i && i)
    
    //     // eliminate the dead keys & store unique objects
    //     .filter(e => arr[e])
    
    //     .map(e => arr[e]);
    
    //   return unique;
    // }
    
  

/**
	 * Get the Total Pages count.
	 *
	 * @param total
	 * @param denominator Count of results per page
	 * @return {number}
	 */
	getPageCount = ( total, denominator ) => {
		const divisible	= 0 === total % denominator;
		const valueToBeAdded = divisible ? 0 : 1;
		return Math.floor( total/denominator ) + valueToBeAdded;
  };
  
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push('/')
  }
 
  paginationClick = param =>event=> {
    
    this.setState({
      dataloaded:false,
      paginationloaded:false
     
    })
  this.state.searchparam = param;
 
  if(this.state.loading === true && this.state.searchparam!==''){
    //this.setState({ isActivepagination : event.target.value })
    let pageno = event.target.value;
    this.state.currentPage = event.target.value * 100
    //const queryadd = event.target.queryadd;
    const queryadd = this.state.searchparam;
    
    this.setState( { queryadd, loading: true, message: '',isActivepagination : pageno }, () => {
      this.fetchSearchResults(this.state.currentPage, queryadd );
    });
  }
  else{
      //this.setState({ isActivepagination : event.target.value })
      let pageno = event.target.value;
      this.state.currentPage = event.target.value * 100
      getSEDataSummary(this.state.currentPage).then((res)=>{
        this.setState({
            data:res,
            dataloaded:true,
            paginationloaded:true,
            isActivepagination : pageno
        })
      })
    }
  
  }
OpenList() {
  var x = document.getElementById("list1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

OpenList2() {
  var x = document.getElementById("list2");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//Clickoutside
setWrapperRef1(node) {
    this.wrapperRef1 = node;
}
setWrapperRef2(node) {
  this.wrapperRef2 = node;
}
 handleClickOutside(event) {
    if (this.wrapperRef1 && !this.wrapperRef1.contains(event.target)) {
        var x = document.getElementById("list1");
        if (x.style.display === "block") {
            x.style.display = "none";
          } 
    }
    if (this.wrapperRef2 && !this.wrapperRef2.contains(event.target)) {
        var y = document.getElementById("list2");
        if (y.style.display === "block") {
            y.style.display = "none";
          } 
    }
}

reset(e){
   this.state.searchparam = ''
    document.getElementById('search-input').value='';
    //document.getElementById('search_filter').classList.remove("active");
    this.setState({
          query:'',
          loading:false,
          dataloaded:false,
          searchdata:0,
          searchloading:false,
          length_is_less_than_3:false,
          isActivepagination : false
    })
    countTotal().then((res)=>{
      this.setState({
          totalRecords:res,
          dataloaded:true,
          length_is_less_than_3:false,
          isActivepagination : false
      })
    })
    getSEDataSummary(this.state.currentPage=1).then((res)=>{
      this.setState({
          data:res,
          dataloaded:true,
          paginationloaded:true,
          length_is_less_than_3:false,
          isActivepagination : false
      })
    })
    
}

  componentDidMount =()=>{
   
    getSEDataSummary(0).then((res)=>{
      if(res !== undefined){
        this.setState({
          data:res,
          dataloaded:true,
          paginationloaded:true
        })
      }
      else{
        this.props.history.push('/')
      }
      
    })

    countTotal().then((res)=>{
      this.setState({
          totalRecords:res,
          dataloaded:true,
          length_is_less_than_3:false
      })
    })

    // getNeighbours().then((response)=>{
       
    //   this.setState({
    //     neighbours:response
    //   })
    // })
    
    document.addEventListener('mousedown', this.handleClickOutside);
  }


/**  Company Loaded in modal */
  handleShow(address) {
    this.setState({
      datacomploaded:false
    })
    getCompanies(address).then((res)=>{
      this.setState({
          data_comp:res,
          datacomploaded:true
      })
    })
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

/**  Company Loaded in modal */

/**  seacrh box value function with onblur and onfocus */

  _onBlur(event) {
    document.getElementById('search_filter').classList.add("active");
    setTimeout(() => {
        if (this.state.focus) {
            this.setState({
                focus: false,
            });
        }
    }, 0);
    const query = event.target.value;
   
        if(query.trim().length > 3){
          search_counttotal(query).then((res)=>{
            this.setState({
                totalRecords:res,
                dataloaded:false,
                currentPage:1
            })
          })
        }
          this.setState( { query, loading: true, message: '',isActivepagination : false }, () => {
            this.fetchSearchResults( 1, query );
          });
       
}
_onFocus() {
  
    if (!this.state.focus) {
        this.setState({
            focus: true,
        });
    }
   
}
handleKeyUp(event) {
  document.getElementById('search_filter').classList.add("active");
  if (event.keyCode === 13) {
    const query = event.target.value;
        if(query.trim().length > 3){
          search_counttotal(query).then((res)=>{
            this.setState({
                totalRecords:res,
                dataloaded:false,
                currentPage:1
            })
          })
        }
        this.setState( { query, loading: true, message: '',isActivepagination : false }, () => {
          this.fetchSearchResults( 1, query );
        });
    
  }
}

/**  seacrh box value function */


/**  seacrh box value function with onchange */
  // handleOnInputChange = ( event ) => {
  //   document.getElementById('search_filter').classList.add("active");
  //   const query = event.target.value;
  
  //   if ( ! query ) {
  //     this.setState( { query, results: {}, message: '', totalPages: 0, totalResults: 0 } );
  //   } else {
  //       if(query.length > 3){
  //         search_counttotal(query).then((res)=>{
  //           this.setState({
  //               totalRecords:res,
  //               dataloaded:false,
  //               currentPage:1
  //           })
  //         })
  //       }
  //         this.setState( { query, loading: true, message: '',isActivepagination : false }, () => {
  //           this.fetchSearchResults( 1, query );
  //         });
       
  //   }
  // };


  fetchSearchResults = ( updatedPageNo = '', query ) => {
    const pageNumber = updatedPageNo ? `&limit=${updatedPageNo}` : '';
   
    if(query.trim().length >3){
    const searchUrl = `?search_q=${query}${pageNumber}`;
    
          this.setState({
            searchloading:false,
            dataloaded:false,
            length_is_less_than_3:false
          })
        getexactsearch(searchUrl).then((reso)=>{
          if(reso!=undefined){
          let length = Object.keys(reso).length;
            
            this.setState({
              searchdata:reso,
              loading:true,
              dataloaded:true,
              searchloading:true,
              totalRecords:this.state.totalRecords,
              length_is_less_than_3:false
            })
         
          }      
        })
    }
    else if(query.trim().length<=3){
   
    document.getElementById('search_filter').classList.remove("active");
    this.setState({
      searchloading:false,
      length_is_less_than_3:0,
      dataloaded:true,
      searchdata:'',
      currentPage:1,
      loading:false,
      query, 
      results: {},
      message: '',
      totalPages: 0,
      totalResults: 0
    })

    countTotal().then((res)=>{
      this.setState({
          totalRecords:res,
          dataloaded:true,
          length_is_less_than_3:false
      })
    })
  
   
    getSEDataSummary(0).then((res)=>{
      if(res !== undefined){
        this.setState({
          data:res,
          dataloaded:true,
          paginationloaded:true
        })
      }
      else{
        this.props.history.push('/')
      }
      
    })
    }
  };

  /**  seacrh box value function with onchange */
  
  

  render() {
    if(!localStorage.usertoken){
      return <Redirect to='/' />
    }
  
    /* show value to the searchbar*/ 
   
    const { query,data,currentPage, todosPerPage } = this.state;
    const isSearched = this.state.loading;
    let totalRecords = this.state.totalRecords;
    const companies = this.state.data_comp;
    const searchloading = this.state.searchloading;
    const get_search_data = this.state.searchdata;
    let search_length = Object.keys(get_search_data).length;
    if(searchloading == false){
      search_length = 0;
    }
    const dataLoaded = this.state.dataloaded;
    const datacompLoaded = this.state.datacomploaded;
    const companies_length = Object.keys(companies).length;
    const data_length = Object.keys(data).length;

    //+++++++select neighbourhood //

      // const neighbours = this.state.neighbours;
      // const neighbour = this.state.neighbour;
      
      // const uniqueCouse = this.getUnique(this.state.neighbours, "address");
  
      
      // const filterDropdown = neighbours.filter(function(result) {
      //   return result.address === neighbour;
      // });
    //+++++++selct neighbourhood //


    // Logic for displaying data
    const indexOfLastTodo  = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
   

      // Logic for displaying page numbers
      const pageNumbers = [];
     
      for (let i = 1; i <= Math.ceil(totalRecords / todosPerPage); i++) {
        pageNumbers.push(i);
      }
            
                      {/* 
                      <li class="page-item active">
                        <span class="page-link">
                          2
                          <span class="sr-only">(current)</span>
                        </span>
                      </li>
                      */}
                     
          const renderPageNumbers = pageNumbers.map(number => {
            let className;

            if(number == this.state.isActivepagination){
                 className = "page-link active"
            }
            else{
                 className = "page-link"
            }
            return (
              <li className="page-item"  key={number}  id={number} onClick={this.paginationClick(query)} >
                <button type="button" className={className} value={number}>{number}</button>
              </li>
            );
          });
         
          const display = Object.keys(data).map((d, key) => {
            
              if(key === 0){
                key = 1;
              }
              else{
                key = key+1;
              }
              if(this.state.currentPage === 100 || this.state.currentPage === 1){
                key = key;
              }
              else{
                key = this.state.currentPage + key -100;

              }
          return (
                <tr key={key}>
                      <td>{key}#</td>
                      { (data[d].total > 1) ? (<td className="stylecolor">{data[d].address}</td>) :
                      (<td> {data[d].address}</td>)}
                      <td>
                          {/* <span className="btn btn-small action"  onClick={() => this.handlenextShow(data[d].address)}>Details</span> */}
                          <a href={"#/listingdetails/"+ data[d].address} className="btn btn-small action">Details</a>
                      </td>
                      <td>
                          <span className="btn btn-small action"  onClick={() => this.handleShow(data[d].address)}>Companies</span>
                      </td>
                </tr>
            );
         
        });
     
          const display_search_results = Object.keys(get_search_data).map((d3, key3) => {
            if(key3 === 0){
              key3 = 1;
            }
            else{
              key3 = key3+1;
            }
            if(this.state.currentPage === 100 || this.state.currentPage === 1){
              key3 = key3;
            }
            else{
              key3 = this.state.currentPage + key3 -100;

            }
            return (
                  <tr key={key3}>
                      <td>{key3}#</td>
                      { (get_search_data[d3].total > 1) ? (<td className="stylecolor">{get_search_data[d3].address}</td>) :
                      (<td> {get_search_data[d3].address}</td>)}
                      <td>
                          {/* <span className="btn btn-small action"  onClick={() => this.handlenextShow(get_search_data[d3].address)}>Details</span> */}
                          <a href={"#/listingdetails/"+ get_search_data[d3].address} className="btn btn-small action" address={get_search_data[d3].address}>Details</a>
                      </td>
                      <td>
                          <span className="btn btn-small action"  onClick={() => this.handleShow(get_search_data[d3].address)}>Companies</span>
                      </td>
                </tr>
            );
          });
        
    
          const company_display = Object.keys(companies).map((d1, key1) => {
              if(key1 === 0){
                key1 = 1;
              }
              else{
                key1 = key1+1;
              }
          
            return (
                  <tr key={key1}>
                  <td>{key1}#</td><td>{companies[d1].agency}</td>
                  </tr>
              );
          });

        //   if(get_data_list.length>0){
        //     let rowKey = Object.keys(get_data_list[0]);
        //     data_list_display = rowKey.map((value, index) => {
            
        //       var re = /_/gi; 
        //       var newstr = value.replace(re, " "); 
        //       return (
        //         <div>
        //           <tr key={value}>
        //             <th>{newstr.toUpperCase()}:</th>
        //             <td>{get_data_list[0][value]}</td>
        //           </tr>
        //         </div>
        //       )
        
        //     });
        //  }
        
    return (
     <div>
        <div className="dashboard"> 
          <div className="main-panel">
         
          {/* <div className="filterBox">
          <label htmlFor="sel1">Select Neighbourhood:</label>
          <Form.Group>
            <Form.Control as="select" className="form-control" id="sel1"  value={this.state.neighbour} onChange={this.handleChangeneighbour}>
                {uniqueCouse.map(neighbour => (
                            <option key={neighbour.id} value={neighbour.address}>
                              {neighbour.address}
                            </option>
                            ))}
              </Form.Control>
            </Form.Group>
          </div> // value={ query } */}
          
            <div className="mt-1">
            <Table striped hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Address 
                      <div className="icon-wrap search" id="search_filter" onClick={this.OpenList}></div>
                      {/* <div id="list1" className="table-collapse" ref={this.setWrapperRef1} style={{display:'none'}}>
                        <div className="box">
                          <input type="text" name="query" id="search-input" placeholder="Search..." value={query} onChange={this.handleOnInputChange} className="search-input" style={{maxWidth:'235px'}} />
                            <span className="reset_btn" onClick={() => this.reset()}>(X)</span> 
                          <ul></ul>
                        </div>
                      </div> */}
                      <div id="list1" className="table-collapse" ref={this.setWrapperRef1} style={{display:'none'}}>
                        <div className="box">
                          <input
                             type="text"
                             name="query"
                             id="search-input" placeholder="Search..."
                             className="search-input" style={{maxWidth:'235px'}}
                             onFocus={this._onFocus}
                             onBlur={this._onBlur}
                             onKeyUp={ this.handleKeyUp }
                             valuelink={query}
                          />
                          <span className="reset_btn" onClick={() => this.reset()} style={{cursor:'pointer'}}>(X)</span> 
                          <ul></ul>
                        </div>
                      </div>
                  </th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              
                 { 
                   (isSearched === true && search_length!==0 && (this.state.searchdata == 'No data Found' && this.state.searchdata !='') && this.state.searchloading === true && search_length!=0) ? (<tbody><tr><td></td><td align="right">No Records Found</td><td></td><td></td></tr></tbody>) :
                   (isSearched === true && search_length!==0 && (this.state.searchdata !== 'No data Found' && this.state.searchdata !='') && this.state.searchloading === true && search_length!=0) ? (<tbody>{ display_search_results }</tbody>) :
                   (isSearched === true && search_length!==0 && (this.state.searchdata !== 'No data Found' && this.state.searchdata !='') && this.state.searchloading === false) ? (<tbody><tr><td></td><td align="center">Please wait while loading the data...<img src="/loading.gif"  height='50px' alt="" /></td><td></td><td></td></tr></tbody>) :
                   (isSearched ===true && search_length===0 && this.state.searchloading === false && this.state.length_is_less_than_3 ===false) ? (<tbody><tr><td></td><td align="center">Please wait while loading the data...<img src="/loading.gif"  height='50px' alt="" /></td><td></td><td></td></tr></tbody>) :
                   ((isSearched ===true || dataLoaded === true) && (search_length===0 || search_length!==0) && this.state.searchloading === false && this.state.length_is_less_than_3 === true) ? (<tbody><tr><td></td><td align="center">Please type your search string more than 3 letters...</td><td></td><td></td></tr></tbody>) :
                   (dataLoaded === false  && search_length===0 && this.state.searchloading === false && data_length === 0 && this.state.paginationloaded ===false) ? (<tbody><tr><td></td><td align="center">Please wait while loading the data...<img src="/loading.gif"  height='50px' alt="" /></td><td></td><td></td></tr></tbody>):
                   (dataLoaded === false  && search_length===0 && this.state.searchloading === false && data_length !== 0 && this.state.paginationloaded ===false) ? (<tbody><tr><td></td><td align="center">Please wait while loading the data...<img src="/loading.gif"  height='50px' alt="" /></td><td></td><td></td></tr></tbody>):
                   (<tbody>{display}</tbody>) }

                    {/* <div className="form-group">
                      <br/>
                        {filterDropdown.map(neighbour => (
                          <div key={neighbour.id} style={{ margin: "10px" }}>
                            {neighbour.company}
                            <br />
                          </div>
                        ))}
                    </div> */}
            </Table>
            {(isSearched === true && searchloading === true && search_length!=0 && dataLoaded === true &&  totalRecords>100) ?
            (<div className="margin_65">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                    {/* <li className="page-item disabled"><span className="page-link">Previous</span> </li> */}
                        {/* <li class="page-item active">
                          <span class="page-link"> 
                            2
                            <span class="sr-only">(current)</span>
                          </span>
                        </li> */}
                        {renderPageNumbers}
                      {/* <li className="page-item"> <a className="page-link" href="#">Next</a></li> */}
                    </ul>
                </nav>
            </div>):
            (isSearched !== true && dataLoaded === true  && search_length===0 && totalRecords>100  && totalRecords!='' && data_length!=0)?
            (<div className="margin_65">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                    {/* <li className="page-item disabled"><span className="page-link">Previous</span> </li> */}
                        {/* <li class="page-item active">
                          <span class="page-link">
                            2
                            <span class="sr-only">(current)</span>
                          </span>
                        </li> */}
                         {renderPageNumbers}
                      {/* <li className="page-item"> <a className="page-link" href="#">Next</a></li> */}
                    </ul>
                </nav>
            </div>):(<div></div>)}
            </div>
          </div>

        <footer>
          <p>Copyright © 2019 Skyward.com</p>
        </footer>
        </div>

{/*Modal Start*/}
<Modal  size="md" show={this.state.show} onHide={this.handleClose} className="dashboard-modal">
      <Modal.Header closeButton>
        <Modal.Title>List of Companies</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="add-bus-details">
          <div className="mt-1">
            <Table striped hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company</th>
                </tr>
              </thead>
              
                { (datacompLoaded === false ) ?
                (<tbody><tr><td></td><td align="center">Please wait while loading the data...<img src="/loading.gif"  height='50px' alt="" /></td><td></td></tr></tbody>) :
                (companies_length === 0 )?
                (<tbody><tr><td></td><td>No data found...</td><td></td></tr></tbody>) :
                <tbody>
                  { company_display }
                </tbody>}
            </Table>
            </div>
      </div>
      </Modal.Body>
     
    </Modal>
{/*Modal End*/}


{/*Modal Start*/}
{/* <Modal  size="md" show={this.state.nextshow} onHide={this.handlenextClose} className="dashboard-modal">
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="add-bus-details">
      <div className="mt-1">
            <Table striped hover size="sm">
              { (datalistLoaded === false ) ?
              (<tbody><tr><td></td><td align="center"><img src="/loading.gif"  height='50px' alt="" /></td><td></td></tr></tbody>) :
              (get_data_list_length === 0 )?
              (<tbody><tr><td></td><td>No data found...</td><td></td></tr></tbody>) :
              <tbody>
               { data_list_display }
             </tbody>}
            </Table>
            </div>
      </div>
      </Modal.Body>
     
    </Modal> */}
{/*Modal End*/}

      </div>
    );
  }
}
export default Dashboard;