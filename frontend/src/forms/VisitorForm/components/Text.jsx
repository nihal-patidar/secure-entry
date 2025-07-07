import React from 'react';

const Text = ({ que, disc, err, note }) => {
    que = que || "Enter your text";
    disc = disc || "Please provide the required text.";
    return (
        <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>    
            <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>{que}</label>
                <div style={{display: 'flex',width: '450px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#fff',
                            fontSize: '21px', flexDirection: 'row', gap: '10px'}}>
                    <input
                        type="text"
                        style={{
                            backgroundColor: 'transparent',
                            outline: 'none',
                            width:"450px"
                        }}
                    />
                </div>
                <p style={{ marginBottom: '10px', color: '#555' }}>{disc}</p>
                {err && <p style={{ color: 'red', marginBottom: '10px' }}>{err}</p>}
                {note && <p style={{ color: 'green', marginBottom: '10px' }}>{note}</p>}
            </div>
        </div>
    );
};

export default Text;