import './index.css'
import {Link} from 'react-router-dom'
import {FaStar, FaBriefcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <li className="job-item-bg-container">
      <Link to={`/jobs/${id}`} className="job-item-link">
        <div className="logo-title-cont">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-rating-cont">
            <h1 className="job-title">{title}</h1>
            <div className="rating-cont">
              <FaStar className="star-icon" />
              <p className="company-rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="job-meta-cont">
          <div className="meta-left">
            <div className="meta-item">
              <MdLocationOn className="meta-icon" />
              <p className="loc-and-empl-text">{location}</p>
            </div>
            <div className="meta-item">
              <FaBriefcase className="meta-icon" />
              <p className="loc-and-empl-text">{employmentType}</p>
            </div>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>

        <div className="job-description-cont">
          <h1 className="desc-title">Description</h1>
          <p className="desc-text">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem