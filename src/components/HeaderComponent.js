import React, {Component} from 'react';
import {Navbar, NavbarBrand, Jumbotron} from 'reactstrap';

class Header extends Component {
    render(){
        return(
          <React.Fragment>
              <Navbar dark >
                <div className = "container">
                  <NavbarBrand href = "/">Ristorante Con Fusion</NavbarBrand>
                </div>
              </Navbar>
              <Jumbotron>
                <div classNme= " container">
                  <div classNme= "row row-header">
                    <div classNme= " col-12 col-sm-6">
                      <h1>Ristorante Con Fusion</h1>
                      <p>we take inspiration from the World's best cuisines, and create
                          a unique fusion experience. Our lipsmacking creation will tickle
                          your culnury senses!</p>
                    </div>
                  </div>
                </div>
              </Jumbotron>

          </React.Fragment>
        );
    }
}
export default Header;
