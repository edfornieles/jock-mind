require('dotenv').config({ path: '.env.local' });

console.log('Environment Variables:');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 
  `${process.env.OPENAI_API_KEY.slice(0, 8)}...${process.env.OPENAI_API_KEY.slice(-4)}` : 
  'Not found'
);
console.log('NODE_ENV:', process.env.NODE_ENV); 