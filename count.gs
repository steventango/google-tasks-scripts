const TASKLIST_IDS = [
  "<redacted>"
];


async function count(tasklist_id) {
  const tasks = Tasks.Tasks.list(tasklist_id, {
    showCompleted: false,
    maxResults: 100
  });
  const n = tasks.items.length;
  let tasklist;
  try {
    tasklist = Tasks.Tasklists.get(tasklist_id);
  } catch (error) {
    console.error('An error occurred:', error);
    return;
  }
  const old_title = tasklist.title;
  let new_title = old_title;
  if (n > 0) {
    let number = n;
    if (tasks.nextPageToken) {
      number += "+";
    }
    const match = new_title.match(/\(([\d+]+)\)$/);
    if (match) {
      new_title = new_title.replace(/\([\d+]+\)$/, `(${number})`);
    } else {
      new_title += ` (${number})`;
    }
  } else {
    new_title = new_title.replace(/ \([\d+]+\)$/, '');
  }
  if (new_title != old_title) {
    tasklist.title = new_title;
    Tasks.Tasklists.patch(tasklist, tasklist_id);
  }
}

async function counts() {
  for (let tasklist_id of TASKLIST_IDS) {
    await count(tasklist_id);
  }
}
