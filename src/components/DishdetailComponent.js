import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal,
     ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent'
import {baseUrl} from  '../shared/baseUrl';
import{FadeTransform, Fade, Stagger}  from 'react-animation-components';
;

  function RenderDish({dish}) {
      if (dish != null)
          return(
            <div className="col-12 col-md-5 m-1">
            <FadeTransform in
              transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
              }}>
                  <Card >
                      <CardImg  width="100%" src={baseUrl +  dish.image} alt={dish.name} />
                      <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                      </CardBody>
                  </Card>
              </FadeTransform>
            </div>
          );
      else
          return(
              <div></div>
          );
  }

  function RenderComments({comments, postComment, dishId}) {
        if (comments != null) {

        const cmnts = comments.map(comment => {
            return (
              <Fade in>
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
              </Fade>
            )
        })
        return (
          <div className="col-12 col-md-5 m-1">
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                  <Stagger in>
                      {cmnts}
                  </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        );
      }
      else {
              return (
                  <div></div>
              )
          }
      }


    const DishDetail = (props) =>  {
          if(props.isLoading) {
            return(
              <div className="container">
                < div className="row">
                    < Loading />
                </div>
              </div>
            );
          }

          else if(props.errrMess) {
            return(
              <div className="container">
                < div className="row">
                    <h4>{props.errMess}</h4>
                </div>
              </div>
            );
          }
         if (props.dish != null) {
         return (
            <div className="container">
            <div className ="row">
              <Breadcrumb >
                  <BreadcrumbItem ><Link to='/home'>Home</Link></BreadcrumbItem>
                  <BreadcrumbItem ><Link to='/menu'>Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
          <div className ="col-12">
              <h3>{props.dish.menu}</h3>
              <hr />
          </div>
         </div>
               <div className='row'>
                    <RenderDish dish ={props.dish}/>
                    <RenderComments comments ={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}/>
               </div>
             </div>
         );
       }
         else
            return(
              <div></div>
            );

     }

export default DishDetail;

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export class CommentForm extends Component{

  constructor(props){
    super(props)
    this.state ={
    isModalOpen: false
      };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating,
          values.author, values.comment);
      }
      render()
      {
        return(
          <div>
            <Button outline onClick={this.toggleModal}>
              <span className="fa fa-pencil fa-lg">Submit Comment</span>
            </Button>

            <div className="row row-content">
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Submit omment</ModalHeader>
                        <ModalBody>
                        <div className="col-12 col-md-9">
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                  <Label htmlFor="rating" >Rating</Label>
                                    <Col md={10}>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                          <option>1</option>
                                          <option>2</option>
                                          <option>3</option>
                                          <option>4</option>
                                          <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                  <Label htmlFor="author" md={2}>Your Name</Label>
                                    <Col ml={10}>
                                        <Control.text model=".author" name="author" id="author"
                                        placeholder ="Author"
                                        className="form-control"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                                        <Errors className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{requied: 'Required', minLength: 'Must be greater than 3 characters',
                                             maxLength:'Must  be 15 characters or less'}}
                                             />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                        <Label htmlFor="feedback" md={3}>Your feedback</Label>
                                        <Col ml={10}>
                                            <Control.textarea model=".comment" id="comment" name="comment"
                                                rows="6"
                                                className="form-control"
                                                validators={{ required }} />
                                            <Errors className="text-danger" model=".comment" show="touched"
                                                messages={{ required: 'Required'}} />
                                        </Col>
                                    </Row>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                              </LocalForm>
                            </div>
                        </ModalBody>
                  </Modal>
            </div>
          </div>
        );
      }
    }
