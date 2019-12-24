import React, {Component} from 'react';
import {login} from './UserFunctions';

const emailRegex = RegExp(/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[A-Za-z.]+$/);
const formValid = errors => {
  let valid = true;

  Object.values(errors).forEach(val => {
      val.length > 0 && (valid = false);
  });

  Object.values(errors).forEach(val => {
    val === null && (valid = false);
 });
  return valid;

}


class Login extends Component {
  constructor(){
    super()
    
    this.state = {
      email : '',
      password: '',
      formErrors: {
        email : '',
        password: ''
      }
     
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit =  this.onSubmit.bind(this)
    
  }

  onChange(e){
    e.preventDefault();
    const { name ,value} = e.target;
    let formErrors = this.state.formErrors;
   
    switch(name){
      case 'email':
          formErrors.email = emailRegex.test(value) ? ""
            : "Invalid email address";
            break;
      case "password" :
          formErrors.password = value.length < 6 && value.length > 0 
            ? 'Minimum 6 chars required'
            : "";
            break;
            default:
            break;
    }
    this.setState({ formErrors, [name]: value }, () => 
          this.state
    );
    //this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e){
      e.preventDefault()  

    
      if(formValid(this.state.formErrors)){
        // console.log(`
        // --SUBMITTING--
        // Email: ${this.state.email}
        // Password: ${this.state.password}
        // `);

      } else {
        //console.error('FORM INVALID- DISPLAY ERROR MESSAGE');
      }

      const user = {
        email : this.state.email,
        password: this.state.password
      }

      login(user).then(res => {
        let formErrors = {};
       
       if(res==='invalid_credentials'){
                formErrors["email"] = "invalid";
                formErrors["password"] = "invalid";
                this.setState({formErrors:formErrors});
        }
        else if(res==='Please fill the credentials...'){
              formErrors["email"] = "*Please enter your email.";
              formErrors["password"] = "*Please enter your password.";
              this.setState({formErrors:formErrors});
        }
        else{
            this.props.history.push('/dashboard')
        }
      })
  }
  
  
  render(){
    const { formErrors } = this.state;
   
    return(
      <div className="container mycont">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">
                Please Sign In
              </h1>
                {
                  <h5 className="errormessage">{ formErrors.email && formErrors.password === 'invalid' ? 'Invalid Credentials' : ''}</h5>
                }
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email"
                name="email"
                className ="form-control"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={this.onChange} required=""/>
                {
                  <span className="errormessage">{ formErrors.email !== 'invalid' ? formErrors.email : ''}</span>
                }
              </div>
             
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={this.state.password}
                onChange={this.onChange} required=""/>
                {
                <span className="errormessage">{ formErrors.password !== 'invalid' ? formErrors.password : ''}</span>
                }
              </div>
              <button type="submit" className="btn btn-lg btn-primary btn-block">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    )
  }


}
export default Login