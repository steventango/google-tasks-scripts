# google-tasks-auto-icebox
Google App Script for moving stale tasks to another tasklist

## Usage
1. Run `list_tasklist_indentifiers()` to get `id` for the `SOURCE_TASKLIST` and `TARGET_TASKLIST` constants.
2. Add a Trigger that runs function `icebox()` with Time-driven event source as appropriate.
