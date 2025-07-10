import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const USER_AVATAR = 'https://ui-avatars.com/api/?name=You&background=0D8ABC&color=fff&size=64';
const AI_AVATAR = 'https://ui-avatars.com/api/?name=Lexi&background=F4B400&color=fff&size=64';

const App = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const userMessage = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuery('');
    setTimeout(() => {
      const response = {
        answer:
          "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased’s annual income should be added as future prospects.",
        citations: [
          {
            text:
              "As the age of the deceased at the time of accident was held to be about 54–55 years, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
            source: "Dani_Devi_v_Pritam_Singh.pdf",
            link:
              "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz",
          },
        ],
      };
      const aiMessage = { role: 'ai', content: response.answer, citations: response.citations };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f8', padding: 0 }}>
      <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: 700, marginTop: 40, marginBottom: 40 }}>
          <div className="text-center mb-4">
            <h2 style={{ fontWeight: 700, letterSpacing: 1 }}>Lexi Legal Assistant</h2>
            <div className="text-muted" style={{ fontSize: 18 }}>Ask legal questions, get instant answers.</div>
          </div>
          <div className="rounded-4 shadow-sm bg-white p-4 mb-4" style={{ minHeight: 500, maxHeight: '60vh', overflowY: 'auto', border: '1px solid #ececec', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {messages.length === 0 && (
              <div className="text-center text-muted mt-5">Ask your first legal question...</div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                style={{ gap: 16 }}
              >
                {msg.role === 'ai' && (
                  <img src={AI_AVATAR} alt="AI" style={{ width: 40, height: 40, borderRadius: '50%', marginTop: 2 }} />
                )}
                <div
                  className={
                    msg.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-light border'
                  }
                  style={{
                    borderRadius: 18,
                    padding: '16px 20px',
                    maxWidth: '75%',
                    fontSize: 16,
                    boxShadow: msg.role === 'ai' ? '0 2px 8px #ececec' : 'none',
                    wordBreak: 'break-word',
                  }}
                >
                  <div>{msg.content}</div>
                  {msg.citations && (
                    <>
                      <hr />
                      <h6 style={{ fontSize: 14, fontWeight: 600 }}>Citations:</h6>
                      {msg.citations.map((citation, cidx) => (
                        <div key={cidx} style={{ fontSize: 14 }}>
                          <p>{citation.text}</p>
                          <a
                            href={citation.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-link p-0"
                          >
                            Open {citation.source}
                          </a>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                {msg.role === 'user' && (
                  <img src={USER_AVATAR} alt="You" style={{ width: 40, height: 40, borderRadius: '50%', marginTop: 2 }} />
                )}
              </div>
            ))}
            {loading && (
              <div className="d-flex justify-content-start" style={{ gap: 16 }}>
                <img src={AI_AVATAR} alt="AI" style={{ width: 40, height: 40, borderRadius: '50%', marginTop: 2 }} />
                <div className="bg-light border" style={{ borderRadius: 18, padding: '16px 20px', maxWidth: '75%', fontSize: 16, boxShadow: '0 2px 8px #ececec' }}>
                  <span className="text-muted">Lexi is typing...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="w-100">
            <div className="input-group" style={{ gap: 8 }}>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                rows="2"
                className="form-control"
                placeholder="Type your message..."
                required
                disabled={loading}
                style={{ resize: 'none', borderRadius: 12, fontSize: 16, background: '#f7f7f8', border: '1px solid #ececec', padding: '12px 16px' }}
              ></textarea>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading || !query.trim()}
                style={{ borderRadius: 12, minWidth: 80, fontWeight: 600, fontSize: 16 }}
              >
                {loading ? '...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
