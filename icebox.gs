const ICEBOX_OVERDUE_DELAY = 7 * 24 * 60 * 60 * 1000;
const ICEBOX_UNDATED_DELAY = 24 * 60 * 60 * 1000;
const THAW_DELAY = 7 * 24 * 60 * 60 * 1000;
const SOURCE_TASKLIST = "<redacted>";
const TARGET_TASKLIST = "<redacted>";

function list_tasklist_indentifiers() {
  console.log(Tasks.Tasklists.list())
}

function list_tasks() {
  const tasks = Tasks.Tasks.list(TARGET_TASKLIST, {
    showCompleted: false,
    maxResults: 100
  });
  for (let task of tasks.items) {
    console.log(task);
  }
}

async function move(task, source, target) {
  if (task.due !== null) {
    const date = new Date(task.due);
    const date_string = date.toLocaleDateString();
    if (task.notes) {
      task.notes += `\nOriginal due date: ${date_string}`;
    } else {
      task.notes = `Original due date: ${dateString}`;
    }
  }
  Tasks.Tasks.insert(task, target);
  Tasks.Tasks.remove(source, task.id);
}

async function removeDue(task, tasklist) {
  task.due = null;
  Tasks.Tasks.patch(task, tasklist, task.id);
}

async function icebox() {
  const tasks = Tasks.Tasks.list(SOURCE_TASKLIST, {
    showCompleted: false,
    maxResults: 100
  });
  const now = new Date();
  const requests = [];
  for (const task of tasks.items) {
    if (!task.hasOwnProperty('due')) {
      const updated = new Date(task.updated);
      if (now - updated > ICEBOX_UNDATED_DELAY) {
        requests.push(move(task, SOURCE_TASKLIST, TARGET_TASKLIST));
      }
    } else {
      const due = new Date(task.due);
      if (now - due > ICEBOX_OVERDUE_DELAY) {
        requests.push(removeDue(task, SOURCE_TASKLIST));
        requests.push(move(task, SOURCE_TASKLIST, TARGET_TASKLIST));
      }
    }
  }
  await Promise.all(requests);
}

async function thaw() {
  const tasks = Tasks.Tasks.list(TARGET_TASKLIST, {
    showCompleted: false,
    maxResults: 100
  });
  const now = new Date();
  const requests = [];
  for (const task of tasks.items) {
    if (task.hasOwnProperty('due')) {
      const due = new Date(task.due);

      if (due - now < THAW_DELAY) {
        requests.push(move(task, TARGET_TASKLIST, SOURCE_TASKLIST));
      }
    }
  }
  await Promise.all(requests);
}

async function main() {
  await icebox();
  await thaw();
}

