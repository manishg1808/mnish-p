// Quick test to check if server is responding
fetch('http://localhost:5000/api/home-banner')
  .then(res => res.json())
  .then(data => {
    console.log('✅ Server is running! Response:', data)
  })
  .catch(err => {
    console.error('❌ Server not responding:', err.message)
    console.log('Make sure to run: node server.js')
  })

