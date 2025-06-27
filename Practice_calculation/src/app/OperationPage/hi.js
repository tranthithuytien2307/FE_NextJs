'use client';
import { Children } from 'react';
import OperationProvider from '../OperationProvider';

export default function OperationPage() {
  return (
    <OperationProvider>
      {Children}
    </OperationProvider>
  );
}