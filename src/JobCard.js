

const JobCard = ({ title, salary, equity, companyName }) => {
    return (
        <div className='card my-3'>
			<div className='row no-gutters'>

				<div className='col-md-12'>
					<div className='card-body'>
						<h5 className='card-title'>{title}</h5>
						<p className='card-text'>{companyName}</p>
						<p className='card-text'>
							<p className='text-muted'>Salary: {salary}</p>
							<p className='text-muted'>Equity: {equity}</p>
						</p>
					</div>
				</div>
			</div>
		</div>
    )
}
export default JobCard;