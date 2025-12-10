import './index.css'
import {FaStar, FaBriefcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'

const JobDetailsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    skills,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  const {description, imageUrl} = lifeAtCompany

  return (
    <div className="job-details-card-bg">
      <div className="logo-and-title-cont">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="company-logo-img"
        />
        <div className="title-and-rating-cont">
          <h1 className="company-title">{title}</h1>
          <div className="rating-star-cont">
            <FaStar className="star-icon" />
            <p className="company-rating">{rating}</p>
          </div>
        </div>
      </div>

      <div className="location-and-lpa-cont">
        <div className="loc-and-type-cont">
          <div className="icons-text-cont">
            <MdLocationOn />
            <p className="loc-and-type-text">{location}</p>
          </div>
          <div className="icons-text-cont">
            <FaBriefcase />
            <p className="loc-and-type-text">{employmentType}</p>
          </div>
        </div>
        <p className="company-package-heading">{packagePerAnnum}</p>
      </div>

      <div className="job-desc-container">
        <div className="desc-and-link">
          <h1>Description</h1>
          <a
            href={companyWebsiteUrl}
            target="_blank"
            rel="noreferrer"
            className="company-link"
          >
            Visit <FiExternalLink className="visit-icon" />
          </a>
        </div>
        <p className="description-text">{jobDescription}</p>
      </div>

      <div>
        <h1>Skills</h1>
        <ul className="skills-list">
          {skills.map(each => (
            <li key={each.name} className="skill-item">
              <img src={each.imageUrl} alt={each.name} className="skill-icon" />
              <p>{each.name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="life-at-company-section">
        <h1>Life at Company</h1>
        <div className="life-at-company-content">
          <p className="company-description-para">{description}</p>
          <img
            src={imageUrl}
            alt="life at company"
            className="life-at-company-img"
          />
        </div>
      </div>
    </div>
  )
}

export default JobDetailsCard
