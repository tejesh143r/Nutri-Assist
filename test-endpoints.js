const http = require('http');

const API_HOST = 'localhost';
const API_PORT = 8000;

// Helper to make JSON requests
const makeRequest = (method, path, body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (body) {
      headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const options = {
      hostname: API_HOST,
      port: API_PORT,
      path: path,
      method: method,
      headers: headers,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ statusCode: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ statusCode: res.statusCode, rawBody: data });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(postData);
    }
    req.end();
  });
};

async function runTests() {
  console.log('=== Starting API Sanity Tests ===\n');
  let token = null;

  try {
    // Test 1: Register User
    console.log('Test 1: Registering user...');
    const emailSuffix = Date.now();
    const regRes = await makeRequest('POST', '/api/users/register', {
      username: 'Test intern',
      email: `test_intern_${emailSuffix}@example.com`,
      password: 'password123',
      age: 23,
      weight: 68,
      height: 172,
      gender: 'Male',
      activityLevel: 'Lightly Active',
      goal: 'Weight Loss',
    });

    console.log('Register Response Status:', regRes.statusCode);
    if (regRes.statusCode === 201 && regRes.body.success) {
      console.log('✓ Register User Passed');
      token = regRes.body.token;
    } else {
      console.log('✗ Register User Failed:', regRes.body);
      process.exit(1);
    }

    // Test 2: Login User
    console.log('\nTest 2: Logging in user...');
    const loginRes = await makeRequest('POST', '/api/users/login', {
      email: `test_intern_${emailSuffix}@example.com`,
      password: 'password123',
    });

    console.log('Login Response Status:', loginRes.statusCode);
    if (loginRes.statusCode === 200 && loginRes.body.success) {
      console.log('✓ Login User Passed');
    } else {
      console.log('✗ Login User Failed:', loginRes.body);
      process.exit(1);
    }

    // Test 3: Get Profile
    console.log('\nTest 3: Fetching user profile...');
    const profileRes = await makeRequest('GET', '/api/users/profile', null, token);
    console.log('Profile Response Status:', profileRes.statusCode);
    if (profileRes.statusCode === 200 && profileRes.body.success) {
      console.log('✓ Get Profile Passed. User:', profileRes.body.user.username);
    } else {
      console.log('✗ Get Profile Failed:', profileRes.body);
      process.exit(1);
    }

    // Test 4: Create Suggestion
    console.log('\nTest 4: Creating personalized nutrition suggestion...');
    const sugRes = await makeRequest('POST', '/api/suggestions/create', {}, token);
    console.log('Create Suggestion Status:', sugRes.statusCode);
    if (sugRes.statusCode === 201 && sugRes.body.success) {
      console.log('✓ Create Suggestion Passed');
      console.log('  BMI:', sugRes.body.suggestion.bmi);
      console.log('  Calorie target:', sugRes.body.suggestion.calories, 'kcal');
      console.log('  Protein:', sugRes.body.suggestion.protein, 'g');
      console.log('  Carbs:', sugRes.body.suggestion.carbs, 'g');
      console.log('  Fats:', sugRes.body.suggestion.fats, 'g');
      console.log('  Diet Tips count:', sugRes.body.suggestion.recommendations.length);
    } else {
      console.log('✗ Create Suggestion Failed:', regRes.body);
      process.exit(1);
    }

    // Test 5: Get Suggestions History
    console.log('\nTest 5: Fetching suggestions history...');
    const historyRes = await makeRequest('GET', '/api/suggestions/history', null, token);
    console.log('History Status:', historyRes.statusCode);
    if (historyRes.statusCode === 200 && historyRes.body.success) {
      console.log('✓ Get History Passed. Total logs:', historyRes.body.suggestions.length);
    } else {
      console.log('✗ Get History Failed:', historyRes.body);
      process.exit(1);
    }

    console.log('\n=== All API Sanity Tests Passed Successfully! ===');
  } catch (err) {
    console.error('Error during test execution:', err.message);
    process.exit(1);
  }
}

runTests();
