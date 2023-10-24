const TASKLIST_ID = "<redacted>";


async function count() {
  const tasks = Tasks.Tasks.list(TASKLIST_ID, {
    showCompleted: false,
    maxResults: 100
  });
  const n = tasks.items.length;
  const tasklist = Tasks.Tasklists.get(TASKLIST_ID);
  if (n > 0) {
    const match = tasklist.title.match(/\((\d+)\)$/);
    if (match) {
      tasklist.title = tasklist.title.replace(/\((\d+)\)$/, `(${n})`);
    } else {
      tasklist.title += ` (${n})`;
    }
  } else {
    tasklist.title = tasklist.title.replace(/ \(\d+\)$/, '');
  }
  Tasks.Tasklists.patch(tasklist, TASKLIST_ID);
}
