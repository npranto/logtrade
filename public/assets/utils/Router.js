/* eslint-disable default-param-last */
// import parseQueryString from "./parseQueryString.js";
import queryString from 'query-string';

const getMatchingRedirect = (redirectRules = []) =>
	redirectRules.find((redirect) => !!redirect.rule());

const Router = (routes = [], query = 'page', fallbackRoute) => {
	if (!routes || !routes.length) {
		console.info('No routes detected, rendering default fallback page');
		return fallbackRoute.page(fallbackRoute?.props || {});
	}

	if (!fallbackRoute) {
		console.log('Please provide a `fallbackRoute` property to router');
	}

	const parsedQuery = queryString.parse(window?.location?.search);

	if (!parsedQuery[query]) {
		console.info(
			`No [${query}] query detected, rendering default fallback page`
		);
		return fallbackRoute.page(fallbackRoute?.props || {});
	}

	const matchingPage = routes.find(
		(route) =>
			route.matchingQuery.toLowerCase() === parsedQuery[query].toLowerCase()
	);
	console.log({ matchingPage });

	if (!matchingPage) {
		console.info(
			`No matching [${query}] query detected, rendering default fallback page`
		);
		return fallbackRoute.page(fallbackRoute?.props || {});
	}
	const { redirectTo = null } =
		getMatchingRedirect(matchingPage.redirectRules) || {};

	if (redirectTo) {
		console.info(`Matching redirect detected, redirecting to [${redirectTo}]`);
		return window.location.replace(redirectTo);
	}
	console.info(
		`Matching [${query}] query detected, rendering [${matchingPage.matchingQuery}] page`
	);
	return matchingPage.page(matchingPage?.props || {});
};

export default Router;
