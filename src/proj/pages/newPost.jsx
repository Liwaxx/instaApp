  import React, { Component } from 'react';
  import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CTextarea,
    CInputFile,
    CLabel,
  } from '@coreui/react'
  import Axios from 'axios';

  class newPost extends Component {

    constructor(){
      super();
      this.state = {
          img:'',
          caption: ''
      }
    }

    handleInputChange = (event) => {
      this.setState({
          img: event.target.files[0],
        })
        console.log(this.state.img)
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
};

  handleSubmit = e => {
    const data = new FormData()
    data.append('image', this.state.img)
    data.append('caption', this.state.caption)

    console.warn(this.state.selectedFile);
    let url = "http://localhost:8000/api/upload/"+localStorage.getItem('user_id');
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    e.preventDefault();
    Axios.post(url,data,config)
    .then(res => { // then print response status
        if(res.data.status === "success"){
          alert("berhasil upload Postingan")
          window.location.reload();
        };
    })

  }
    render() {
      return (
      <CCard>
            <CCardHeader>
              <h4>Make a New Post</h4>
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal" onSubmit={this.handleSubmit}>
              <CFormGroup row>
                  <CLabel col md="3" htmlFor="file-input">Image</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile name="file-input" type="file" onChange={this.handleInputChange}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Caption</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      required
                      name="caption"
                      id="textarea-input"
                      rows="9"
                      placeholder="Tuliskan caption kamu..."
                      onChange={this.handleChange}
                    />
                  </CCol>
                </CFormGroup>
              <CButton type="submit" color="primary">Post</CButton>
              </CForm>
            </CCardBody>
          </CCard>
      );
    }
  }

  export default newPost;
