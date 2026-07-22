'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { faro } from '@grafana/faro-web-sdk';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Capturado error de renderizado:', error, errorInfo);
    
    // Captura explícita en Faro
    if (typeof window !== 'undefined' && faro?.api) {
      faro.api.pushError(error, {
        skipDedupe: true,
        context: {
          componentStack: errorInfo.componentStack || '',
        },
      });
    }
  }

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ padding: '24px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', margin: '16px 0' }}>
          <h3 style={{ color: '#991b1b', marginTop: 0 }}>⚠️ Se ha producido un error de renderizado</h3>
          <p style={{ color: '#b91c1c', fontSize: '14px' }}>
            {this.state.error?.message || 'Error desconocido'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}