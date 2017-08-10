import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Nav extends React.Component {

  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name='Logout'
          active={activeItem === 'Logout'}
          onClick={this.handleItemClick}
          position="right"
        >
          < NavLink to="/logout"> Logout </NavLink>
        </Menu.Item>

        <Menu.Item
          name='Open an Account'
          active={activeItem === 'Open an Account'}
          onClick={this.handleItemClick}
          position="right"
        >
          < NavLink to="/newaccount"> Open an Account </NavLink>
        </Menu.Item>
      </Menu>
    )
  }

}

export default Nav
