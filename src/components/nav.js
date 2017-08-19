import React from 'react'
import { Menu, Segment, Image, Dropdown } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom'

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
      >
      <div className="recommendationText"> Investment Tracker </div>
      </Menu.Item>
      {this.props.isLoggedIn ?
        <Dropdown item text='Accounts'>
        <Dropdown.Menu position="right">
          <Dropdown.Item>< NavLink to="/home"><div className="blackfont">Balances and Holdings</div></NavLink></Dropdown.Item>
          <Dropdown.Item>< NavLink to="/newaccount"><div className="blackfont"> Open an Account </div></NavLink></Dropdown.Item>
          <Dropdown.Item>< NavLink to="/transact"><div className="blackfont"> Trade </div></NavLink></Dropdown.Item>
          <Dropdown.Item>< NavLink to="/transactions"><div className="blackfont"> Transaction History </div></NavLink></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      : null
     }
      {this.props.isLoggedIn ?
        <Dropdown item text='Market Performance'>
        <Dropdown.Menu>
          <Dropdown.Item>< NavLink to="/stockperformance"><div className="blackfont"> US Performance by Stock </div></NavLink></Dropdown.Item>
          <Dropdown.Item>< NavLink to="/performance"><div className="blackfont"> US Performance by Sector </div></NavLink></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      : null
     }
      {this.props.isLoggedIn ?
        <Dropdown item text='Tools'>
        <Dropdown.Menu>
          <Dropdown.Item>< NavLink to="/investmentquestionaire"> <div className="blackfont"> Retirement Income Portfolios </div></NavLink></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      : null
     }
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
      </Menu>
    )
  }

}

export default Nav
