import React, { Component } from 'react';
import ModalImage from "react-modal-image";
import Axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

class myPost extends Component {
  state = {
    dataPosts : [],
    dataComs: [],
    isLoading : true,
    show : false,
    setShow :  false,
    caption : '',
    idPost: null,
}
  componentDidMount(){
    let url = "http://localhost:8000/api/my-posts/ "+localStorage.getItem('user_id');
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    Axios.get(url,config)
    .then(res => {
        this.setState({
          dataPosts : res.data.data,
          isLoading : false
        })
    }).catch(err => {
      console.log(err.message)
    })
  }

  handleDelete = (e) => {

    if(window.confirm('Yakin menghapus postingan ?')){
      let url = "http://localhost:8000/api/delete/"+e;
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }

        Axios.get(url,config)
      .then(res => {
        alert(res.data.message)
        window.location.reload();
      }).catch(err => {
        console.log(err.message)
      })
    }
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
    console.log(this.state.caption);
};

  handleEdit = (id) => {
    let url = "http://localhost:8000/api/edit/"+id;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    let data = {caption : this.state.caption}

      Axios.post(url,data,config)
    .then(res => {
      alert(res.data.message)
      window.location.reload();
    }).catch(err => {
      console.log(err.message)
    })
  }

  handleClose = (e) => {
    this.setState({
  setShow : false,
  show : false
  })};

  handleShow = (e,id) => {
  e.preventDefault();
  let url = "http://localhost:8000/api/dash-comments/"+id;
  let config = {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }

  Axios.get(url,config)
  .then(res => {
      this.setState({
        dataComs : res.data.data
      });
  }).catch(err => {
    console.log(err.message)
  })

  this.setState({
  setShow : true,
  show : true,
  idPost: id
  })};

  render() {
    if(this.state.isLoading){
      return(
        <div className="pt-3 text-center">
          <div className="sk-spinner sk-spinner-pulse"></div>
        </div>
      );
    }else{
      return (
        <div>
          <table className="table table-hover table-outline w-auto">
          <thead className="thead-light">
            <tr>
              <th className="text-center">Pictures</th>
              <th>Caption</th>
              <th className="text-center">Likes</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dataPosts.map((data,idx) =>
              <tr key={idx}>
              <td className="text-center w-50">
              <div>
                <ModalImage
                    small={"http://localhost:8000/images/"+data.images}
                    large={"http://localhost:8000/images/"+data.images}
                    alt={data.caption}
                  />
              </div>
              </td>
              <td>
                <div className="clearfix">
                    {data.caption}
                </div>
              </td>
              <td className="text-center">
                <p> 90 </p>
              </td>
              <td>
                <form>
                  <div className="">
                    <button className="btn btn-success" onClick={(e,id) => this.handleShow(e,data.id)}>Edit Caption</button>
                  </div>
                </form>
                <br />
                  <button className="btn btn-danger" onClick={(e) => this.handleDelete(data.id)}>Delete post</button>
              </td>
            </tr>
            )}
          </tbody>
          <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>All Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {this.state.dataComs.map((data,idx) =>
            <div><strong>{data.name}</strong><p>{data.comment}</p></div>
          )}
          </Modal.Body>
          <Modal.Body>
            <h5>Edit Caption</h5>
            <div className="float-left">
              <input type="text" name="caption" placeholder="Edit caption..." className="form-control" onChange={this.handleChange} required/>
            </div>
            <div className="">
              <button className="btn btn-success block" onClick={(e) => this.handleEdit(this.state.idPost)}>Edit</button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </table>
        </div>
      );
    }
  }
}

export default myPost;
