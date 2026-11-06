import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [concepts, setConcepts] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputNotes, setInputNotes] = useState('');

  // 1. READ (GET)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/concepts')
      .then(res => res.json())
      .then(data => setConcepts(data))
      .catch(err => console.error("Error fetching:", err));
  }, []);

  // 2. CREATE (POST)
  const handleAddConcept = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const payload = { name: inputText, status: 'pending', notes: inputNotes };

    try {
      const res = await fetch('http://127.0.0.1:8000/concepts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save');

      // Trust the Receipt
      const savedConcept = await res.json();
      setConcepts([...concepts, savedConcept]);

      setInputText('');
      setInputNotes('');
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  // 3. DELETE
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/concepts/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete');

      // Filter out the deleted item from local state
      setConcepts(concepts.filter(c => c.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // 4. UPDATE (Toggle Status)
  const handleToggle = async (id, currentConcept) => {
    // Figure out the new status
    const newStatus = currentConcept.status === 'pending' ? 'completed' : 'pending';

    // Package the whole object (because your PUT endpoint expects ConceptIn)
    const payload = {
      name: currentConcept.name,
      status: newStatus,
      notes: currentConcept.notes
    };

    try {
      const res = await fetch(`http://127.0.0.1:8000/concepts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to update');

      // Trust the Receipt
      const updatedConcept = await res.json();

      // Map over state, replacing the old one with the updated one
      setConcepts(concepts.map(c => c.id === id ? updatedConcept : c));
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>My Concepts</h1>

      {/* CREATE FORM */}
      <form onSubmit={handleAddConcept} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #444', borderRadius: '8px' }}>
        <h3>Add a Concept</h3>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Concept name..."
          style={{ padding: '8px', marginRight: '10px', width: '100%', marginBottom: '10px' }}
        />
        <input
          value={inputNotes}
          onChange={(e) => setInputNotes(e.target.value)}
          placeholder="Notes..."
          style={{ padding: '8px', marginRight: '10px', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Add Concept</button>
      </form>

      {/* LIST */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {concepts.map(c => (
          <li key={c.id} style={{ padding: '15px', border: '1px solid #333', marginBottom: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ textDecoration: c.status === 'completed' ? 'line-through' : 'none' }}>
                {c.name}
              </strong>
              <span style={{ marginLeft: '10px', color: '#888', fontSize: '0.9em' }}>
                [{c.status}]
              </span>
              {c.notes && <div style={{ color: '#aaa', fontSize: '0.9em', marginTop: '5px' }}>{c.notes}</div>}
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleToggle(c.id, c)} style={{ cursor: 'pointer' }}>
                {c.status === 'pending' ? 'Complete' : 'Undo'}
              </button>
              <button onClick={() => handleDelete(c.id)} style={{ cursor: 'pointer', color: 'red' }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;