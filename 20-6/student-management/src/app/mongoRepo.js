module.exports = class MongoRepo {
  constructor(model) {
    this.model = model;
  }
  async save(data) {
    return await this.model.create(data);
  }
  async findById(id) {
    return await this.model.findOne({ id });
  }
  async update(data) {
    return await this.model.findOneAndUpdate({ id: data.id }, data, { new: true });
  }
  async delete(id) {
    await this.model.deleteOne({ id });
  }
};