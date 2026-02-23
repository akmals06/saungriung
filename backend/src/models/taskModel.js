class Task {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = new Date();
        this.status = 'pending';
    }
}

module.exports = Task;
