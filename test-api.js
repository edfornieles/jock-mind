const OpenAI = require('openai');
require('dotenv').config({ path: '.env.local' });

async function testAPI() {
  console.log('=== Testing OpenAI API Configuration ===');
  
  // 1. Check environment variable
  const apiKey = process.env.OPENAI_API_KEY;
  console.log('\n1. Environment Variable Check:');
  console.log(`API Key exists: ${!!apiKey}`);
  console.log(`API Key length: ${apiKey?.length || 0}`);
  console.log(`API Key format: ${apiKey?.startsWith('sk-') ? 'Valid format' : 'Invalid format'}`);
  
  if (!apiKey) {
    console.error('❌ OPENAI_API_KEY is not set in .env.local');
    process.exit(1);
  }

  // 2. Test OpenAI client
  console.log('\n2. Testing OpenAI Client:');
  const openai = new OpenAI({
    apiKey: apiKey
  });

  try {
    // Test a simple API call
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Say 'API test successful' if you can read this."
        }
      ],
      max_tokens: 10
    });

    console.log('✅ OpenAI API test successful');
    console.log('Response:', response.choices[0].message.content);
  } catch (error) {
    console.error('❌ OpenAI API test failed');
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    process.exit(1);
  }

  // 3. Test the generate-thought endpoint
  console.log('\n3. Testing generate-thought endpoint:');
  try {
    const response = await fetch('http://localhost:3000/api/generate-thought', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: "Test prompt",
        maxTokens: 50
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ generate-thought endpoint test successful');
    console.log('Response:', data);
  } catch (error) {
    console.error('❌ generate-thought endpoint test failed');
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

testAPI().catch(console.error); 