import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfilePage from '../ProfilePage'
import FiltersSection from '../FiltersSection'
import JobItem from '../JobItem'
import {AiOutlineSearch} from 'react-icons/ai'
import './index.css'

const apiResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsPage extends Component {
  state = {
    jobsList: [],
    apiStatus: apiResponse.initial,
    searchedJob: '',
    selectedEmploymentTypes: [],
    selectedSalaryRange: '',
  }

  componentDidMount() {
    this.getAllJobs()
  }

  onSearchJob = event => {
    this.setState(
      {searchedJob: event.target.value},
      this.getAllJobs
    )
  }

  onClickSearch = () => {
    this.getAllJobs()
  }

  onChangeEmploymentType = employmentTypeId => {
    this.setState(
      prevState => {
        const {selectedEmploymentTypes} = prevState
        if (selectedEmploymentTypes.includes(employmentTypeId)) {
          return {
            selectedEmploymentTypes: selectedEmploymentTypes.filter(
              each => each !== employmentTypeId,
            ),
          }
        }
        return {
          selectedEmploymentTypes: [
            ...selectedEmploymentTypes,
            employmentTypeId,
          ],
        }
      },
      this.getAllJobs,
    )
  }

  onChangeSalaryRange = salaryRangeId => {
    this.setState({selectedSalaryRange: salaryRangeId}, this.getAllJobs)
  }

  // 🌟 Fetch Jobs API
  getAllJobs = async () => {
    this.setState({apiStatus: apiResponse.inProgress})
    const token = Cookies.get('jwt_token')

    const {searchedJob, selectedEmploymentTypes, selectedSalaryRange} =
      this.state

    const employmentTypesQuery = selectedEmploymentTypes.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesQuery}&minimum_package=${selectedSalaryRange}&search=${searchedJob}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobs = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList: updatedJobs, apiStatus: apiResponse.success})
    } else {
      this.setState({apiStatus: apiResponse.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.getAllJobs}>
        Retry
      </button>
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    const hasJobs = jobsList.length > 0

    return hasJobs ? (
      <ul className="jobs-list-ul">
        {jobsList.map(each => (
          <JobItem key={each.id} jobDetails={each} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiResponse.inProgress:
        return this.renderLoaderView()
      case apiResponse.success:
        return this.renderJobsListView()
      case apiResponse.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {searchedJob} = this.state

    return (
      <div>
        <Header />
        <div className="jobspage-bg-container">
          <div className="ls-card">
            <ProfilePage />
            <FiltersSection
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onChangeEmploymentType={this.onChangeEmploymentType}
              onChangeSalaryRange={this.onChangeSalaryRange}
            />
          </div>
          <div className="rs-card">
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchedJob}
                onChange={this.onSearchJob} // ⭐ LIVE SEARCH
              />
              <button
                type="button"
                className="search-btn"
                onClick={this.onClickSearch}
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPage
