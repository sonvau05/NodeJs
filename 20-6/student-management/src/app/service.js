const { v4: uuid } = require('uuid');
class Service {
  constructor(repo, enrollRepo) {
    this.repo = repo;
    this.enrollRepo = enrollRepo;
  }
  async create(data, isStudent) {
    data.id = uuid();
    return await this.repo.save(isStudent ? new (require('../domain/student'))(data.id, data.name, data.age)
      : new (require('../domain/course'))(data.id, data.name, data.credits));
  }
  async get(id) {
    return await this.repo.findById(id);
  }
  async update(id, data) {
    data.id = id;
    return await this.repo.update(data);
  }
  async delete(id) {
    await this.repo.delete(id);
  }
  async enroll(studentId, courseId) {
    await this.enrollRepo.save(new (require('../domain/enrollment'))(studentId, courseId));
  }
}
module.exports = Service;