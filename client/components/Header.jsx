import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Header.styles.css';

export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    issuer: PropTypes.string,
    onLogout: PropTypes.func.isRequired
  };

  getPicture(iss, user) {
    if (user && user.get('picture')) {
      return user.get('picture');
    }

    if (user && user.get('nickname')) {
      return `https://cdn.auth0.com/avatars/${user.get('nickname').slice(0, 2).toLowerCase()}.png`;
    }

    return `https://cdn.auth0.com/avatars/${iss.slice(0, 2).toLowerCase()}.png`;
  }

  showOnFocus() {
    document.querySelector('#navbar-collapse li.dropdown').classList.add('open');
  }

  hideOnBlur() {
    document.querySelector('#navbar-collapse li.dropdown').classList.remove('open');
  }

  render() {
    const { user, issuer } = this.props;
    return (
      <header className="dashboard-header">
        <nav title="header" role="navigation" className="navbar navbar-default">
          <div className="container">
            <div id="header" className="navbar-header" style={{ width: '800px' }}>
              <span className="navbar-brand">Auth0 Example Extension</span>
            </div>
            <div id="navbar-collapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown">
                  <span role="button" data-toggle="dropdown" data-target="#" className="btn-dro btn-username">
                    <img
                      role="presentation"
                      src={this.getPicture(issuer, user)}
                      className="picture avatar"
                      alt="Avatar"
                      title="Avatar"
                    />
                    <span className="username-text">
                      {user.get('name') || user.get('username')}
                    </span>
                    <i className="icon-budicon-460"></i>
                  </span>
                    <ul role="menu" className="dropdown-menu">
                      <li role="presentation">
                        <a role="menuitem" onClick={this.props.onLogout} onFocus={this.showOnFocus} onBlur={this.hideOnBlur} tabIndex="0">
                          Logout
                        </a>
                      </li>
                    </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
