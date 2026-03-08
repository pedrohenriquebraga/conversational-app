import { SendPromptResponseDTO } from './types';

const apiBaseURL = process.env.EXPO_PUBLIC_API_BASE_URL;

/**
 * Streaming real no React Native usando XMLHttpRequest.
 */
export const sendPromptWithStreaming = ({
  prompt,
  onChunk,
  signal,
}: {
  prompt: string;
  onChunk?: (chunk: SendPromptResponseDTO) => void;
  signal?: AbortSignal;
}): Promise<void> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let processedLength = 0;

    xhr.open('POST', `${apiBaseURL}/chat`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Habilita streaming incremental
    xhr.responseType = 'text';

    xhr.onprogress = () => {
      // Pega apenas o trecho novo recebido desde o último onprogress
      const newData = xhr.responseText.slice(processedLength);
      processedLength = xhr.responseText.length;

      if (!newData) return;

      // Processa linha a linha (NDJSON)
      const lines = newData.split('\n');

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        try {
          // Remove prefixo de chunk size do chunked transfer encoding (ex: "144")
          const jsonLine = trimmed.replace(/^[0-9a-f]+\r?$/i, '').replace(/^[0-9a-f]+\s+/i, '').trim();
          if (!jsonLine) continue;

          const data = JSON.parse(jsonLine) as SendPromptResponseDTO;
          onChunk?.(data);
        } catch (error) {
          console.error('[API] JSON chunk parse error', error);
        }
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`API Error: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error'));
    };

    xhr.ontimeout = () => {
      reject(new Error('Request timeout'));
    };

    signal?.addEventListener('abort', () => {
      xhr.abort();
      reject(new Error('Request aborted'));
    });

    xhr.send(JSON.stringify({ prompt }));
  });
};
