import { afterEach, beforeEach, describe, expect, it } from 'vitest';

//Øvelse 1: Test med forskellige inputtyper

export function handleInput(input) {
	if (input === null) {
		return input;
	} else if (typeof input === 'number') {
		return input;
	} else if (typeof input === 'string') {
		return input;
	} else {
		return 'Invalid input, what type of input were you trying to use?';
	}
}

//Øvelse 2: Strukturér dine tests med `describe`, `beforeEach` og `afterEach`

//Øvelse 3: Test af asynkrone funktioner
// Funktion der henter brugerdata
export function fetchUser(userId) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (userId > 0) {
				resolve({
					id: userId,
					name: 'Test User',
					email: 'test@example.com'
				});
			} else {
				reject(new Error('Invalid user ID'));
			}
		}, 100);
	});
}

// Funktion der gemmer data
export function saveData(data) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (data && data.name) {
				resolve({ success: true, message: 'Data saved successfully' });
			} else {
				reject(new Error('Invalid data format'));
			}
		}, 1000);
	});
}

// Funktion der simulerer API kald
export function apiCall(endpoint) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (endpoint === '/success') {
				resolve({ status: 200, data: 'Success' });
			} else if (endpoint === '/error') {
				reject(new Error('API Error: 500'));
			} else {
				reject(new Error('Endpoint not found: 404'));
			}
		}, 50);
	});
}
//Øvelse 4: Test af fejl og undtagelser

export function getFruitStock(type) {
	if (type === 'pineapples') {
		throw new Error('Pineapples are not in stock');
	}
	// Return random stock count for other fruits
	return Math.floor(Math.random() * 100) + 1;
}

//Øvelse 5: Mocking af afhængigheder
//Bruger Funktion der gemmer data til test

//Øvelse 6: Testdækning og refaktorering
