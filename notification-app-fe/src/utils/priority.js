export function getPriorityForType(type) {
  switch (type) {
    case 'Placement':
      return 3;
    case 'Result':
      return 2;
    case 'Event':
      return 1;
    default:
      return 0;
  }
}

export function sortNotificationsByPriorityAndTimestamp(notifications) {
  return [...notifications].sort((a, b) => {
    const pa = getPriorityForType(a.type);
    const pb = getPriorityForType(b.type);

    if (pb !== pa) return pb - pa;

    const ta = new Date(a.timestamp).getTime();
    const tb = new Date(b.timestamp).getTime();

    // latest timestamp first
    return tb - ta;
  });
}

export function formatTimestamp(ts) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return String(ts);
  return d.toLocaleString();
}

