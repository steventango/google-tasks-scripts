# google-tasks-scripts
Google App Scripts for Google Tasks

## auto_icebox.gs
Google App Script for managing stale tasks.

### Usage
1. Run `list_tasklist_indentifiers()` to get the tasklist `id` for the `SOURCE_TASKLIST` and `TARGET_TASKLIST` constants.
2. Edit `ICEBOX_UNDATED_DELAY` constant which specifies the minimum amount of time in milliseconds before tasks without due dates are moved from `SOURCE_TASKLIST` to `TARGET_TASKLIST`.
3. Edit `ICEBOX_OVERDUE_DELAY`constant which specifies the minimum amount of time in milliseconds before overdue tasks are moved from `SOURCE_TASKLIST` to `TARGET_TASKLIST`.
4. Edit `THAW_DELAY` constant which which specifies the minimum amount of time in milliseconds before task due dates are moved from `TARGET_TASKLIST` to `SOURCE_TASKLIST`.
5. Add a Trigger that runs function `icebox()` with Time-driven event source and configure it as desired.

## count.gs
Google App Script for counting tasks in a tasklist.

### Usage
1. Run `list_tasklist_indentifiers()` to get the tasklist `id` for the `TASKLIST_ID` constant.
2. Add a Trigger that runs function `icebox()` with Time-driven event source and configure it as desired.
