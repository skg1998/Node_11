/*
*Create and export configuration variables
*
*/

//Container for all the environment
var environments = {};

//staging (default) environment 
environments.staging ={
	'httpPort':3000,
	'httpsPort':3001
	// 'env' : 'staging'
};

//production environments
environments.production={
	'httpPort':5000,
	'httpsPort' : 5001,
	// 'envName': 'production'
};

//determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ?process.env.NODE_ENV : '';

//check that the current environment is one of the environmments above , if not ,default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports =environmentToExport;