import React, { Component } from 'react'
import TextInputGroup from '../layouts/TextInputGroup';

class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {} 
    };

    componentDidMount(){
        
    }

    onChange = e => this.setState({ 
      // e.target.name references the name 
      // attribute of each input type
      [e.target.name]: e.target.value
    });

    onSubmit = async (dispatch, e) => {
      e.preventDefault();
      const {name, email, phone} = this.state;

      // check for errors
      if(name === '') {
        this.setState({ errors: { name: 'Name is required' }});
        return;
      }

      if(email === '') {
        this.setState({ errors: { email: 'Email address is required' }});
        return;
      }

      if(phone === '') {
        this.setState({ errors: { phone: 'Phone number is required' }});
        return;
      }

  
      
      // Clear state
      this.setState({
        name: '',
        email: '',
        phone: '',
        errors: {} 
      });

      this.props.history.push('/');
    };

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <div className="card mb-3">
          <div className="card-header">
            Update Contact 
          </div>
          <div className="card-body">
              <form onSubmit={this.onSubmit.bind(this)}>
                  <TextInputGroup 
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup 
                    label="Email"
                    name="email"
                    placeholder="Enter email address"
                    type="email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup 
                    label="Phone"
                    name="phone"
                    placeholder="Enter phone number"
                    type="phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input type="submit" value="Update Contact" className="btn btn-light btn-block"/>
              </form>
          </div>
      </div>
    );
  }
}

export default EditContact;