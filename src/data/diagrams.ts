// System diagrams for the project write-ups, keyed by project id.
// Coordinates are node centres in a 480-unit-wide drawing. `trace` is the path a
// request takes, drawn as a dot moving from node to node.

export type Diagram = {
  height: number;
  caption: string;
  nodes: { id: string; label: string; x: number; y: number; removed?: boolean }[];
  edges: { from: string; to: string; label?: string; removed?: boolean; flip?: boolean }[];
  notes?: { x: number; y: number; text: string }[];
  trace: string[];
};

export const diagrams: Record<string, Diagram> = {
  'aktu-answer-copy': {
    height: 270,
    caption:
      'The browser only talks to my API. The API logs in to the portal and starts a background job. A worker fetches the pages with retries and builds the PDF, and the browser polls for progress.',
    nodes: [
      { id: 'browser', label: 'Browser', x: 62, y: 40 },
      { id: 'api', label: 'Next.js API', x: 240, y: 40 },
      { id: 'portal', label: 'AKTU portal', x: 405, y: 135 },
      { id: 'jobs', label: 'Job store', x: 62, y: 230 },
      { id: 'worker', label: 'Worker', x: 240, y: 135 },
      { id: 'pdf', label: 'PDF builder', x: 240, y: 230 },
    ],
    edges: [
      { from: 'browser', to: 'api', label: 'login' },
      { from: 'api', to: 'portal', label: 'session' },
      { from: 'api', to: 'worker', label: 'start job', flip: true },
      { from: 'worker', to: 'portal', label: 'pages' },
      { from: 'worker', to: 'pdf' },
      { from: 'pdf', to: 'jobs', label: 'done' },
      { from: 'jobs', to: 'browser', label: 'poll progress' },
    ],
    trace: ['browser', 'api', 'worker', 'portal', 'worker', 'pdf', 'jobs', 'browser'],
  },

  '2020tax': {
    height: 200,
    caption:
      'Every request used to pass through a proxy that forwarded it without doing anything else. Removing it took one hop off every page load.',
    notes: [
      { x: 18, y: 18, text: 'before' },
      { x: 18, y: 118, text: 'after' },
    ],
    nodes: [
      { id: 'app1', label: 'Next.js app', x: 75, y: 55 },
      { id: 'proxy', label: 'Proxy', x: 240, y: 55, removed: true },
      { id: 'api1', label: 'FastAPI', x: 405, y: 55 },
      { id: 'app2', label: 'Next.js app', x: 75, y: 155 },
      { id: 'api2', label: 'FastAPI', x: 405, y: 155 },
    ],
    edges: [
      { from: 'app1', to: 'proxy', removed: true },
      { from: 'proxy', to: 'api1', removed: true },
      { from: 'app2', to: 'api2', label: 'direct' },
    ],
    trace: ['app2', 'api2', 'app2'],
  },

  'aktu-record-extractor': {
    height: 200,
    caption:
      'One script, left running on its own. It asks the portal for one roll number at a time, logs back in when the session drops, and writes each record out.',
    nodes: [
      { id: 'script', label: 'Node script', x: 75, y: 50 },
      { id: 'portal', label: 'AKTU portal', x: 400, y: 50 },
      { id: 'db', label: 'MongoDB', x: 150, y: 160 },
      { id: 'sheet', label: 'Spreadsheet', x: 330, y: 160 },
    ],
    edges: [
      { from: 'script', to: 'portal', label: 'rate-limited, retried' },
      { from: 'script', to: 'db' },
      { from: 'script', to: 'sheet' },
    ],
    trace: ['script', 'portal', 'script', 'db', 'script', 'sheet', 'script'],
  },

  'crash-detection': {
    height: 200,
    caption:
      'Everything happens on the device. The ESP32 confirms the crash, reads a GPS fix and sends it as a text over GSM, with no internet needed.',
    nodes: [
      { id: 'sensor', label: 'Impact sensor', x: 75, y: 50 },
      { id: 'esp', label: 'ESP32', x: 240, y: 50 },
      { id: 'gps', label: 'GPS', x: 240, y: 155 },
      { id: 'gsm', label: 'SIM800L', x: 405, y: 50 },
      { id: 'phones', label: 'Family', x: 405, y: 155 },
    ],
    edges: [
      { from: 'sensor', to: 'esp', label: 'trigger' },
      { from: 'gps', to: 'esp', label: 'position' },
      { from: 'esp', to: 'gsm' },
      { from: 'gsm', to: 'phones', label: 'SMS' },
    ],
    trace: ['sensor', 'esp', 'gps', 'esp', 'gsm', 'phones'],
  },

  'sentinel-copilot': {
    height: 200,
    caption:
      'Live public data feeds the dashboard. The copilot reads the same data and answers by changing the page: highlighting, pinning notes, adding cards.',
    nodes: [
      { id: 'meteo', label: 'Open-Meteo', x: 70, y: 50 },
      { id: 'usgs', label: 'USGS', x: 70, y: 150 },
      { id: 'dash', label: 'Dashboard', x: 240, y: 100 },
      { id: 'copilot', label: 'Copilot', x: 410, y: 100 },
    ],
    edges: [
      { from: 'meteo', to: 'dash' },
      { from: 'usgs', to: 'dash' },
      { from: 'copilot', to: 'dash', label: 'UI actions' },
    ],
    trace: ['meteo', 'dash', 'copilot', 'dash', 'usgs'],
  },
};
