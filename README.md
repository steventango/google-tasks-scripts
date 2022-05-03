# google-tasks-auto-icebox
Google App Script for moving stale tasks to another tasklist

## Usage
1. Run `list_tasklist_indentifiers()` to get the tasklist `id` for the `SOURCE_TASKLIST` and `TARGET_TASKLIST` constants.
2. Edit `DELAY` constant which specifies the minimum amount of time since tasks were last updated in milliseconds.
3. Add a Trigger that runs function `icebox()` with Time-driven event source and configure it as desired.
