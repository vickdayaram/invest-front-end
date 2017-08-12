import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Nav extends React.Component {

  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu className="ui inverted menu nav" color="blue">
        <Menu.Item>
        </Menu.Item>

        {this.props.isLoggedIn ?
        <Menu.Item
          name='Logout'
          active={activeItem === 'Logout'}
          onClick={this.handleItemClick}
          position="right"
        >
          < NavLink to="/logout"> Logout </NavLink>
        </Menu.Item>
        : null
       }
        {this.props.isLoggedIn ?
        <Menu.Item
          name='Home'
          active={activeItem === 'Home'}
          onClick={this.handleItemClick}
          position="right"
        >
          < NavLink to="/home"> Home </NavLink>
        </Menu.Item>
        : null
       }
       {this.props.isLoggedIn ?
        <Menu.Item
          name='Open an Account'
          active={activeItem === 'Open an Account'}
          onClick={this.handleItemClick}
          position="right"
        >
          < NavLink to="/newaccount"> Open an Account </NavLink>
        </Menu.Item>
        : null
      }
      {this.props.isLoggedIn ?
        <Menu.Item
          name='Transact'
          active={activeItem === 'Transact'}
          onClick={this.handleItemClick}
          position="right"
        >
          < NavLink to="/transact"> Transact </NavLink>
        </Menu.Item>
        : null
      }
      </Menu>
    )
  }

}

export default Nav
