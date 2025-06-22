const { Student, Course, Enrollment } = require('../config/db');
module.exports = class MySQLRepo {
  constructor(model) {
    this.model = model;
  }
  async save(data) {
    return await this.model.create(data);
  }
  async findById(id) {
    return await this.model.findByPk(id);
  }
  async update(data) {
    await this.model.update(data, { where: { id: data.id } });
    return data;
  }
  async delete(id) {
    await this.model.destroy({ where: { id } });
  }
};