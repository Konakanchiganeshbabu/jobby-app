import './index.css'

const FiltersSection = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onChangeEmploymentType,
    onChangeSalaryRange,
  } = props

  return (
    <div className="filters-container">
      <div className="employment-filter">
        <h1 className="filters-title">Type of Employment</h1>
        <ul className="filter-list">
          {employmentTypesList.map(each => (
            <li key={each.employmentTypeId} className="filter-li-item">
              <input
                type="checkbox"
                id={each.employmentTypeId}
                value={each.employmentTypeId}
                onChange={() => onChangeEmploymentType(each.employmentTypeId)}
              />
              <label htmlFor={each.employmentTypeId} className="label-item">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="salary-filter">
        <h1 className="filters-title">Salary Range</h1>
        <ul className="filter-list">
          {salaryRangesList.map(each => (
            <li key={each.salaryRangeId} className="filter-li-item">
              <input
                type="radio"
                id={each.salaryRangeId}
                name="salary"
                onChange={() => onChangeSalaryRange(each.salaryRangeId)}
              />
              <label htmlFor={each.salaryRangeId} className="label-item">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FiltersSection
