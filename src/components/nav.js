import React from 'react'
import { Menu, Segment, Image, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Nav extends React.Component {

  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu className="ui inverted menu nav" color="blue" fixed="top">
      <Menu.Item
      as={Link}
      to='/home'
      >
      <div className="recommendationText"> Investment Tracker </div>
      </Menu.Item>
      {this.props.isLoggedIn ?
        <Dropdown item text='Accounts'>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/home">Accounts Overview</Dropdown.Item>
          <Dropdown.Item as={Link} to="/balancesandholdings">Balances and Holdings </Dropdown.Item>
          <Dropdown.Item as={Link} to="/transactions">Transaction History </Dropdown.Item>
          <Dropdown.Item as={Link} to="/newaccount">Open an Account</Dropdown.Item>
          <Dropdown.Item as={Link} to="/transact">Trade </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      : null
     }
      {this.props.isLoggedIn ?
        <Dropdown item text='Performance'>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/stockperformance">US Performance by Stock</Dropdown.Item>
          <Dropdown.Item as={Link} to="/performance">US Performance by Sector</Dropdown.Item>
          <Dropdown.Item as={Link} to="/accountperformance">Account Performance</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      : null
     }
      {this.props.isLoggedIn ?
        <Dropdown item text='Tools'>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/investmentquestionaire">Retirement Income Portfolios</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      : null
     }
      {this.props.isLoggedIn ?
      <Menu.Item
        as={Link}
        to='/logout'
        name='Logout'
        active={activeItem === 'Logout'}
        onClick={this.handleItemClick}
        position="right"
      >
        Logout
      </Menu.Item>
      : null
     }
      </Menu>
    )
  }

}

export default Nav
