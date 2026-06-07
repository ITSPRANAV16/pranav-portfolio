// Secure Browser-Level Persistence for Custom Uploaded CV PDF using IndexedDB
const DB_NAME = 'PatilCVStorage';
const STORE_NAME = 'pdf_files';
const KEY_NAME = 'custom_cv_pdf';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

export async function saveCustomCV(file: File | Blob): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(file, KEY_NAME);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getCustomCV(): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(KEY_NAME);

      request.onsuccess = () => {
        resolve(request.result || null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('IndexedDB access failed, falling back:', error);
    return null;
  }
}

export async function hasCustomCV(): Promise<boolean> {
  try {
    const cv = await getCustomCV();
    return cv !== null;
  } catch {
    return false;
  }
}

// Custom CV URL Persistence (Google Drive, Canva, etc.)
const URL_KEY = 'custom_cv_url_link';

export function saveCustomCVUrl(url: string): void {
  try {
    localStorage.setItem(URL_KEY, url);
  } catch (error) {
    console.error('LocalStorage write failed:', error);
  }
}

export function getCustomCVUrl(): string | null {
  try {
    return localStorage.getItem(URL_KEY);
  } catch {
    return null;
  }
}

export function deleteCustomCVUrl(): void {
  try {
    localStorage.removeItem(URL_KEY);
  } catch {
    // ignore
  }
}

export async function handleCVDownload(fallbackUrl?: string): Promise<void> {
  // First, check if there is an uploaded PDF binary file in IndexedDB
  const customFile = await getCustomCV();
  if (customFile) {
    const url = URL.createObjectURL(customFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Pranav_Patil_CV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return;
  }

  // Second, check if there is a custom URL in LocalStorage
  const customUrl = getCustomCVUrl();
  if (customUrl) {
    window.open(customUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  // Fallback to default owner config CV URL
  const defaultUrl = fallbackUrl || 'https://drive.google.com/file/d/1ONsNm81ajVR8-SQvSWJ0cwEhKIhct__Q/view?usp=drive_link';
  window.open(defaultUrl, '_blank', 'noopener,noreferrer');
}


