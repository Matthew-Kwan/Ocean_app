class Goal {
	constructor(title, taskList) {
        this.id = 1;
		this.title = title;
		this.taskList = taskList;
        this.completedTasksNum = 0;
        this.totalTasksNum = taskList.length;
        this.completionPercentage = this.completedTasksNum/this.totalTasksNum*100;

	}
}