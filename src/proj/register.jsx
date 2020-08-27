import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import Axios from 'axios';

 class register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password : '',
      email: '',
      confirmPassword: '',
    }
  }

  handleChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      });
      console.log(this.state.name);
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    Axios.post('http://localhost:8000/api/register',{name : this.state.name, email : this.state.email, password : this.state.password})
    .then(res => {
      if(res.data.status === 'success'){
        alert(res.data.message);
        this.props.history.push('/login');
      }else{
        alert(res.data.message);
      }
    }).catch(err => {console.log(err.message)});
  }

  chekConfirm = () =>{
    if(this.state.confirmPassword === this.state.password){
      return true;
    }else{
      return false;
    }
  }

   render() {
     return (
      <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={this.handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Username" name="name" required onChange={this.handleChange}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" placeholder="Email" name="email" required onChange={this.handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" name="password" required onChange={this.handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Re Type Password" name="confirmPassword" required onChange={this.handleChange} />
                    {this.chekConfirm() ? <p style={{color : 'green'}}>Password checked</p> : <p style={{color : 'red'}}>Password belum sama</p>}
                  </CInputGroup>
                  {this.chekConfirm() ? <CButton color="success" block type="submit">Create Account</CButton> : <CButton color="success" disabled block>Create Account</CButton>}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
     );
   }
 }

 export default register;


