import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-bg-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="web-logo"
        />
      </Link>

      <ul className="home-and-jobs-ul">
        <li className="home-and-jobs-li">
          <Link to="/" className="item-link header-headings">
            Home
          </Link>
        </li>
        <li className="home-and-jobs-li">
          <Link to="/jobs" className="item-link header-headings">
            Jobs
          </Link>
        </li>
        <li className="home-and-jobs-li">
          <button type="button" className="logout-btn" onClick={onClickLogOut}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)