
const CompanyCard = ({ handle, name, description, numEmployees }) => {
	return (
		<div className='card my-3'>
			<div className='row no-gutters'>

				<div className={`col-md-12`}>
					<div className='card-body'>
						<h5 className='card-title'>{name}</h5>
						<p className='card-text'>{description}</p>
						<p className='card-text'>
							<small className='text-muted'>Employees: {numEmployees}</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompanyCard;
