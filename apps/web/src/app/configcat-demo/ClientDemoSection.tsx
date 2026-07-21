'use client';

import React, { useState } from 'react';
import { ConfigCatProvider, ConfigCatUser, useBooleanFlag, useStringFlag } from '@/configcat';

const users = {
  anon: undefined,
  ana: { identifier: 'ana-123', email: 'ana@masorange.com' },
  bob: { identifier: 'bob-456', email: 'bob@example.com' },
};

export function ClientDemoSection({ sdkKey }: { sdkKey: string }) {
  const [selectedUser, setSelectedUser] = useState<'anon' | 'ana' | 'bob'>('anon');
  const currentUser = users[selectedUser];

  return (
  <ConfigCatProvider sdkKey={sdkKey} user={currentUser}>
    {/* Selector de Targeting */}
    <div style={{ marginBottom: '24px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
      <p style={{ margin: '0 0 12px 0', fontWeight: 'bold' }}>🎯 Contexto de Usuario (Targeting):</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={() => setSelectedUser('anon')}
          style={{ padding: '8px 16px', background: selectedUser === 'anon' ? '#2563eb' : '#e5e7eb', color: selectedUser === 'anon' ? '#fff' : '#000', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Anónimo
        </button>
        <button 
          onClick={() => setSelectedUser('ana')}
          style={{ padding: '8px 16px', background: selectedUser === 'ana' ? '#2563eb' : '#e5e7eb', color: selectedUser === 'ana' ? '#fff' : '#000', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Ana (ana@masorange.com)
        </button>
        <button 
          onClick={() => setSelectedUser('bob')}
          style={{ padding: '8px 16px', background: selectedUser === 'bob' ? '#2563eb' : '#e5e7eb', color: selectedUser === 'bob' ? '#fff' : '#000', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Bob (bob@example.com)
        </button>
      </div>
    </div>

    {/* Bloque CSR */}
    <CsrValuesDisplay currentUser={currentUser} />
  </ConfigCatProvider>
);
}

function CsrValuesDisplay({ currentUser }: { currentUser?: ConfigCatUser }) {
  const showNewFeature = useBooleanFlag('show_new_feature', false, currentUser);
  const buttonColor = useStringFlag('button_color', '#2563eb', currentUser);

  return (
    <div style={{ padding: '20px', background: '#fff0f6', borderRadius: '8px', border: '1px solid #ffadd2' }}>
      <h3>💻 Evaluación Client-Side (CSR)</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ margin: '8px 0' }}>
          • <code>show_new_feature</code>: <strong>{showNewFeature ? '🟢 ON' : '🔴 OFF'}</strong>
        </li>
        <li style={{ margin: '8px 0' }}>
          • <code>button_color</code>: <code style={{ color: buttonColor, fontWeight: 'bold' }}>{buttonColor}</code>
        </li>
      </ul>
      
      {showNewFeature && (
        <div style={{ marginTop: '12px', padding: '10px', background: '#d1fae5', color: '#065f46', borderRadius: '6px', fontSize: '13px' }}>
          ✨ ¡Funcionalidad exclusiva visible solo para empleados de @masorange.com!
        </div>
      )}
    </div>
  );
}