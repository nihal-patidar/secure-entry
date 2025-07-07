import React from 'react';

const Address = ({ que, disc, err, note }) => {
    que = que || "Enter your Address";
    disc = disc || "Please provide a valid Address.";
    return (
        <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>    
            <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>{que}</label>
                <div style={{display: 'flex',width: '450px',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            justifyContent:"space-between",
                            backgroundColor: '#fff',
                            fontSize: '21px', flexDirection: 'row', gap: '10px'}}>
                    <input
                        type="text"
                        style={{
                            backgroundColor: 'transparent',
                            outline: 'none',
                            width:"300px"
                        }}
                    />
                    <div>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                        </p>
                    </div>
                </div>
                <p style={{ marginBottom: '10px', color: '#555' }}>{disc}</p>
                {err && <p style={{ color: 'red', marginBottom: '10px' }}>{err}</p>}
                {note && <p style={{ color: 'green', marginBottom: '10px' }}>{note}</p>}
            </div>
        </div>
    );
};

export default Address;