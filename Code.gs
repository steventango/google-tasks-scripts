const DELAY = 24 * 60 * 60 * 1000;
const SOURCE_TASKLIST = "<redacted>";
const TARGET_TASKLIST = "<redacted>";

function list_tasklist_indentifiers() {
  console.log(Tasks.Tasklists.list());
}

async function move(task, source, target) {
  Tasks.Tasks.insert(task, target);
  Tasks.Tasks.remove(source, task.id);
}

async function icebox() {
  tasks = Tasks.Tasks.list(SOURCE_TASKLIST, {
    showCompleted: false,
    maxResults: 100
  });
  const now = new Date();
  const requests = [];
  for (const task of tasks.items) {
    if (!task.hasOwnProperty('due')) {
      const updated = new Date(task.updated);
      if (now - updated > DELAY) {
        requests.push(move(task, SOURCE_TASKLIST, TARGET_TASKLIST));
      }
    }
  }
  await Promise.all(requests);
}
