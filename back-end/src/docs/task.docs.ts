/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     description: Returns a list of all tasks in the system.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: query
 *         name: task_priority
 *         schema:
 *           type: string
 *         description: Filter tasks by priority
 *       - in: query
 *         name: task_status
 *         schema:
 *           type: string
 *         description: Filter tasks by current status
 *       - in: query
 *         name: task_due_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter tasks by due date (YYYY-MM-DD)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *         description: Number of tasks per page
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task with the provided details.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 */

/**
 * @swagger
 * /tasks/{task_id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieves a specific task by its unique ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: number
 *         description: The unique identifier of the task.
 */

/**
 * @swagger
 * /tasks/{task_id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Deletes a specific task by its unique ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: number
 *         description: The unique identifier of the task.
 */

/**
 * @swagger
 * /tasks/{task_id}:
 *   put:
 *     summary: Update a task by ID
 *     description: Updates the details of a specific task by its unique ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: number
 *         description: The unique identifier of the task.
 */
