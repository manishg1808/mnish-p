// Simple test component to check if React is working
import React from 'react'

export default function AppTest() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ color: 'green', fontSize: '48px' }}>✅ React is Working!</h1>
      <p style={{ fontSize: '24px', marginTop: '20px' }}>
        If you see this, React is loading correctly.
      </p>
      <p style={{ marginTop: '20px' }}>
        Check browser console (F12) for any errors.
      </p>
    </div>
  )
}

