import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { handleInput } from './my-functions';
import { fetchUser, saveData, apiCall, getFruitStock } from './my-functions';

//Øvelse 1: Test med forskellige inputtyper
describe('handleInput', () => {
	it('It should take an input of types: number, string or null and return a message with what type the input is', () => {
		expect(handleInput(null)).toEqual(null);
	});
});

//Øvelse 2: Strukturér dine tests med `describe`, `beforeEach` og `afterEach`
describe('handleInput', () => {
	let testData;

	beforeEach(() => {
		testData = {
			numberInput: 42,
			stringInput: 'Hello World',
			nullInput: null,
			undefinedInput: undefined,
			arrayInput: [1, 2, 3],
			objectInput: { key: 'value' }
		};
	});

	afterEach(() => {
		testData = null;
	});

	describe('When input is null', () => {
		it('should return null when input is null', () => {
			const result = handleInput(testData.nullInput);
			expect(result).toBeNull();
		});
	});

	describe('When input is a number', () => {
		it('should return a number when input is a number', () => {
			const result = handleInput(testData.numberInput);
			expect(result).toBe(42);
		});

		it('should work with negative numbers too', () => {
			const result = handleInput(-10);
			expect(result).toBe(-10);
		});

		it('should work with decimals too', () => {
			const result = handleInput(3.1415);
			expect(result).toBe(3.1415);
		});

		it('should work with zero too', () => {
			const result = handleInput(0);
			expect(result).toBe(0);
		});
	});

	describe('When input is a string', () => {
		it('should return string when input is a string', () => {
			const result = handleInput(testData.stringInput);
			expect(result).toBe('Hello World');
		});

		it('should work with an empty string', () => {
			const result = handleInput('');
			expect(result).toBe('');
		});

		it('should work with a string containing numbers', () => {
			const result = handleInput('42');
			expect(result).toBe('42');
		});
	});

	describe('When input is invalid', () => {
		it('should return a undefined message', () => {
			const result = handleInput(testData.undefinedInput);
			expect(result).toBe(
				'Invalid input, what type of input were you trying to use?'
			);
		});

		it('should return a undefined message when an array has been input', () => {
			const result = handleInput([]);
			expect(result).toBe(
				'Invalid input, what type of input were you trying to use?'
			);
		});

		it('should return a undefined message when an object has been input', () => {
			const result = handleInput({});
			expect(result).toBe(
				'Invalid input, what type of input were you trying to use?'
			);
		});

		it('should return a undefined message when an boolean has been input', () => {
			const result = handleInput(true);
			expect(result).toBe(
				'Invalid input, what type of input were you trying to use?'
			);
		});
	});
});

//Øvelse 3: Test af asynkrone funktioner

describe('Async functions with Promises', () => {
	describe('fetchUser with async/await', () => {
		let testUserId;

		beforeEach(() => {
			testUserId = 1;
		});

		it('should successfully fetch user data', async () => {
			// Brug await til at vente på Promise
			const user = await fetchUser(testUserId);

			expect(user).toBeDefined();
			expect(user.id).toBe(1);
			expect(user.name).toBe('Test User');
			expect(user.email).toBe('test@example.com');
		});

		it('should reject with invalid user ID', async () => {
			// Test fejl med expect().rejects
			await expect(fetchUser(-1)).rejects.toThrow('Invalid user ID');
		});

		it('should reject with zero as user ID', async () => {
			// Alternativ måde at teste fejl
			try {
				await fetchUser(0);
				// Hvis vi når hertil, fejlede testen
				fail('Should have thrown an error');
			} catch (error) {
				expect(error.message).toBe('Invalid user ID');
			}
		});
	});
});

//Øvelse 4: Test af fejl og undtagelser

describe('It should throw an error', () => {
	it('should throw an error if input is not a number', () => {
		expect(() => getFruitStock('pineapples')).toThrowError('stock');
	});
});

//Øvelse 5: Mocking af afhængigheder
describe('saveData with fake timers', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	it('should resolve after 1 second with valid data', async () => {
		const validData = { name: 'Test' };
		const promise = saveData(validData);

		// Promise er pending
		expect(promise).toBeInstanceOf(Promise);

		// Spring tiden frem
		vi.advanceTimersByTime(1000);

		// Nu skulle den være resolved
		const result = await promise;
		expect(result.success).toBe(true);
		expect(result.message).toBe('Data saved successfully');
	});

	it('should not resolve before 1 second', async () => {
		const validData = { name: 'Test' };
		const promise = saveData(validData);

		// Spring kun 500ms frem
		vi.advanceTimersByTime(500);

		// Promise er stadig pending (brug ikke await her)
		// Du kan ikke direkte teste pending state, men kan sikre timingen
	});
});

//Øvelse 6: Testdækning og refaktorering
