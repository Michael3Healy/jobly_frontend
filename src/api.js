import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 */

class JoblyApi {
	// token for interacting with API
	static token;

	// Function to send any request to the API
	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method, JoblyApi.call);

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Individual API routes

	/** Get details on a company by handle. */

	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}

	/** Get all companies (or filter by name). */

	static async getAllCompanies(searchParams) {
		let res = await this.request('companies', searchParams);
		return res.companies;
	}

	/** Get all jobs. */

	static async getAllJobs() {
		let res = await this.request('jobs');
		return res.jobs;
	}

	/** Login user with username and password, returns token to authenticate further requests.
	 * 
	 *  { username, password } => { token }
	 */

	static async login(username, password) {
		let res = await this.request('auth/token', { username, password }, 'post');
		return res.token;
	}

	/** Signup user with username, password, firstName, lastName, email, returns token to authenticate further requests.
	 * 
	 * { username, password, firstName, lastName, email } => { token }
	 * */

	static async signup(username, password, firstName, lastName, email) {
		let res = await this.request('auth/register', { username, password, firstName, lastName, email }, 'post');
		return res.token;
	}

	/** Get user details with username.
	 * 
	 * { username } => { user }
	 * 
	 * Where user is { username, firstName, lastName, email, isAdmin, applications }
	 * */

	static async getUser(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	/** Apply user for job
	 * 
	 * { username, jobId } => undefined
	 */

	static async applyToJob(username, jobId) {
		await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
	}

	/** Update user details with username.
	 * 
	 * { username, data } => { user }
	 * 
	 * Where data can include { firstName, lastName, password, email }
	 * 
	 * Returns { username, firstName, lastName, email, isAdmin }
	 */

	static async updateUser(username, data) {
		let res = await this.request(`users/${username}`, data, 'patch');
		return res.user;
	}
}

export default JoblyApi;
