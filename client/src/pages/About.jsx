import React from 'react';

export default function About() {
  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '900px' }}>
      <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>About CivicConnect</h1>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2>Our Mission</h2>
        <p>
          CivicConnect is dedicated to empowering communities by providing a platform where citizens can
          report and track local civic issues. We believe that when communities come together, they can
          create meaningful change in their neighborhoods.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2>What We Do</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Report Issues:</strong> Citizens can easily report local problems like road damage, garbage, water leakage, and more.</li>
          <li><strong>Community Support:</strong> Users can upvote issues they care about, giving visibility to problems affecting their communities.</li>
          <li><strong>Track Progress:</strong> Monitor the status of reported issues and stay informed about resolutions.</li>
          <li><strong>Foster Discussion:</strong> Comment on issues and engage with community members to discuss solutions.</li>
        </ul>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2>Why CivicConnect?</h2>
        <p>
          Traditional channels for reporting civic issues can be slow and ineffective. CivicConnect brings
          the transparency and community engagement of social media to civic problem-solving. Our platform
          makes it easy to report issues, rally community support, and push for real solutions.
        </p>
      </div>

      <div className="card">
        <h2>Our Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h3 style={{ color: 'var(--primary)' }}>🤝 Community</h3>
            <p>We believe in the power of communities working together.</p>
          </div>
          <div>
            <h3 style={{ color: 'var(--primary)' }}>🎯 Transparency</h3>
            <p>Open communication leads to better solutions.</p>
          </div>
          <div>
            <h3 style={{ color: 'var(--primary)' }}>⚡ Action</h3>
            <p>We empower citizens to take action and create change.</p>
          </div>
          <div>
            <h3 style={{ color: 'var(--primary)' }}>🌍 Impact</h3>
            <p>Making our neighborhoods better, one issue at a time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
