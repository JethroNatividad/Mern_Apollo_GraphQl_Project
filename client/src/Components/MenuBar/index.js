import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

function MenuBar() {
  return (
    <div>
      <Menu pointing secondary color='teal' size='large'>
        <Menu.Item
          name='home'
          as={NavLink}
          to='/'
          activeClassName='active'
          exact
        />

        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            as={NavLink}
            to='/login'
            activeClassName='active'
            exact
          />
          <Menu.Item
            name='register'
            as={NavLink}
            to='/register'
            activeClassName='active'
            exact
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default MenuBar;
