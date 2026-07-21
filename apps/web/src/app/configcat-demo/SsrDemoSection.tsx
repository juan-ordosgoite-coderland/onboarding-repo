import * as configcat from 'configcat-node';

interface SsrDemoSectionProps {
  userEmail?: string;
}

export async function SsrDemoSection({ userEmail }: SsrDemoSectionProps) {
  const sdkKey = process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY || '';
  
  // Instanciamos el cliente de Node únicamente en el servidor
  const configCatClient = configcat.getClient(sdkKey);
  
  const user = userEmail ? new configcat.User(userEmail, userEmail) : undefined;
  
  const showNewFeature = await configCatClient.getValueAsync('show_new_feature', false, user);
  const buttonColor = await configCatClient.getValueAsync('button_color', '#000000', user);

  return (
    <div style={{ padding: '20px', background: '#f0f4f8', borderRadius: '8px', border: '1px solid #d0d7de' }}>
      <h3>🖥️ Evaluación Server-Side (SSR)</h3>
      <p style={{ fontSize: '14px', color: '#57606a' }}>
        Contexto de usuario enviado: <strong>{userEmail || 'Anónimo'}</strong>
      </p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ margin: '8px 0' }}>
          • <code>show_new_feature</code>: <strong>{showNewFeature ? '🟢 ON' : '🔴 OFF'}</strong>
        </li>
        <li style={{ margin: '8px 0' }}>
          • <code>button_color</code>: <code style={{ color: buttonColor }}>{buttonColor}</code>
        </li>
      </ul>
    </div>
  );
}