import './index.css'
import {FaStar, FaBriefcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

const SimilarJob = props => {
  const {similarJobDetails} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
  } = similarJobDetails

  return (
    <li className="similar-job-bg-container">
      <div className="similar-job-logo-cont">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-logo"
        />
        <div className="similar-title-rating-cont">
          <h1 className="similar-title">{title}</h1>
          <div className="similar-start-and-rating-cont">
            <FaStar />
            <p>{rating}</p>
          </div>
        </div>
      </div>

      <div className="similar-disc-cont">
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>

      <div className="similar-location-type-cont">
        <div className="similar-location-cont">
          <MdLocationOn />
          <p>{location}</p>
        </div>

        <div className="similar-location-cont">
          <FaBriefcase />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
