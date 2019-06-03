import React, { Component } from 'react'
import TextInputGroup from '../layouts/TextInputGroup';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getContact, updateContact } from '../../actions/contactActions';

class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {} 
    };

    componentDidMount() {
      const { id } = this.props.match.params;
      this.props.getContact(id);
    }

    componentWillReceiveProps(nextProps, nextState) {
      const { name, email, phone } = nextProps.contact;
      this.setState({
        name,
        email,
        phone
      });
    }
    onChange = e => this.setState({ 
      // e.target.name references the name 
      // attribute of each input type
      [e.target.name]: e.target.value
    });

    onSubmit = e => {
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
      const { id } = this.props.match.params;

      const updContact = {
        id,
        name,
        email,
        phone
      };
      
      this.props.updateContact(updContact);

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

EditContact.protoTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contact: state.contact.contact
});

export default connect(mapStateToProps, { getContact, updateContact })(EditContact);