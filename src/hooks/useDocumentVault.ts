/**
 * Custom Hook: useDocumentVault
 * Manages stored digital assets, LOR records, and persistence.
 */

import { useState, useEffect, useCallback } from 'react';
import { VaultDocument } from '../types';
import { INITIAL_VAULT_DOCUMENTS } from '../data/initialProfile';
import { safeStorage } from '../utils/security';

const STORAGE_KEY = 'grantly_vault_docs_v2';

export function useDocumentVault() {
  const [documents, setDocuments] = useState<VaultDocument[]>(() => {
    return safeStorage.getItem<VaultDocument[]>(STORAGE_KEY, INITIAL_VAULT_DOCUMENTS);
  });

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEY, documents);
  }, [documents]);

  const addDocument = useCallback((doc: VaultDocument) => {
    setDocuments(prev => [doc, ...prev]);
  }, []);

  const deleteDocument = useCallback((id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  }, []);

  const resetDocuments = useCallback(() => {
    setDocuments(INITIAL_VAULT_DOCUMENTS);
    safeStorage.setItem(STORAGE_KEY, INITIAL_VAULT_DOCUMENTS);
  }, []);

  return {
    documents,
    addDocument,
    deleteDocument,
    resetDocuments
  };
}
