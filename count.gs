const TASKLIST_ID = "<redacted>";


async function count() {
  const tasks = Tasks.Tasks.list(TASKLIST_ID, {
    showCompleted: false,
    maxResults: 100
  });
  const n = tasks.items.length;
  const tasklist = Tasks.Tasklists.get(TASKLIST_ID);
  const old_title = tasklist.title;
  let new_title = old_title;
  if (n > 0) {
    const match = new_title.match(/\((\d+)\)$/);
    if (match) {
      new_title = new_title.replace(/\((\d+)\)$/, `(${n})`);
    } else {
      new_title += ` (${n})`;
    }
  } else {
    new_title = new_title.replace(/ \(\d+\)$/, '');
  }
  if (new_title != old_title) {
    tasklist.title = new_title;
    Tasks.Tasklists.patch(tasklist, TASKLIST_ID);
  }
}
