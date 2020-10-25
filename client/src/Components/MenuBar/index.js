import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';

function MenuBar() {
  const { user, removeUser } = useAuthContext();
  console.log('history >', History);
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
          {user ? (
            <Menu.Item name='logout' onClick={removeUser} />
          ) : (
            [
              <Menu.Item
                key='login'
                name='login'
                as={NavLink}
                to='/login'
                activeClassName='active'
                exact
              />,
              <Menu.Item
                key='register'
                name='register'
                as={NavLink}
                to='/register'
                activeClassName='active'
                exact
              />,
            ]
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default MenuBar;
