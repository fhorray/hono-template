export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Template!</h1>
      <p>This is the home page utilizing automatic File-based Routing.</p>
      <ul style={{ marginTop: '1rem' }}>
        <li><a href="/user/123">View User Profile (ID: 123)</a></li>
        <li><a href="/api/hello">Test API Endpoint</a></li>
      </ul>
    </div>
  )
}
