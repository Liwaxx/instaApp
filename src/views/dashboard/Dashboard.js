import ModalImage from "react-modal-image";
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Axios from 'axios';

class Dashboard extends Component {

  state = {
    dataFeeds : [],
    dataComs: [],
    isLoading : true,
    show : false,
    setShow :  false,
    comment:'',
    idPost: null,
}
  componentDidMount(){

    if(localStorage.getItem('token') === null){
      this.props.history.push('/login')
    }

    let url = "http://localhost:8000/api/feeds";
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    Axios.get(url,config)
    .then(res => {
        this.setState({
          dataFeeds : res.data.data,
          isLoading : false
        })
    }).catch(err => {
      console.log(err.message)
    })
  }

  handleComment = (id) => {
    let url = "http://localhost:8000/api/comment/"+id;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    let data = {comment : this.state.comment}

    if(!this.state.comment){
      alert('mau komen ga si?')
    }else{
      Axios.post(url,data,config)
      .then(res => {
        alert(res.data.message)
        window.location.reload();
      }).catch(err => {
        alert(err.message)
      })
    }
  }

  handleLike = (e,id) =>{
    e.preventDefault();
    let url = "http://localhost:8000/api/like";
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    let data = {
      id_user : localStorage.getItem('user_id'),
      id_post : id
    }

    Axios.post(url,data,config)
    .then(res => {
        alert(res.data.message)
        window.location.reload()
    }).catch(err => {
      console.log(err.message)
    })
  }
  handleUnLike = (e,id) =>{
    e.preventDefault();
    let url = "http://localhost:8000/api/un-like/"+id;
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    Axios.get(url,config)
    .then(res => {
        alert(res.data.message)
        window.location.reload()
    }).catch(err => {
      console.log(err.message)
    })
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
};

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
          <table className="table table-hover table-outline w-auto text-center">
          <thead className="thead-light">
            <tr>
              <th>User</th>
              <th className="text-center">Pictures</th>
              <th>Caption</th>
              <th className="text-center">Likes</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dataFeeds.map((data,idx) =>
              <tr key={idx}>
              <td className="text-center">
                <h5>{data.name}</h5>
              </td>
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
                    <h6>{data.caption}</h6>
                </div>
              </td>
              <td className="text-center">
             {data.liked === 1 ? <button className="btn btn-info" size="sm" onClick={(e,id) => this.handleUnLike(e,data.id)}>UnLike</button> :
                <button className="btn btn-info" size="sm" onClick={(e,id) => this.handleLike(e,data.id)}>Like</button>
              }

              </td>
              <td>
                  <button className="btn btn-warning" onClick={(e,id) => this.handleShow(e,data.id)}>View Comments</button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
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
            <h5>Post a comment</h5>
            <div className="float-left">
              <input type="text" name="comment" placeholder="write a comment..." className="form-control" onChange={this.handleChange} required/>
            </div>
            <div className="">
              <button className="btn btn-success" onClick={(e) => this.handleComment(this.state.idPost)}>Comment</button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      );
    }
  }
}

export default Dashboard;
