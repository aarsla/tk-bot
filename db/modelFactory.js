function getModels(sequelize) {
    const models = [require("./models/event")];
    const result = {};

    for (const model of models) {
        result[model.name] = modelFactory(sequelize, model);
    }

    return result;
}

const modelFactory = (sequelize, modelDefinition) => {
    const customModel = sequelize.define(
        modelDefinition.name,
        modelDefinition.schema,
        {
            sequelize,
            modelName: modelDefinition.modelName || modelDefinition.name,
        }
    );
    return customModel;
};

module.exports = {
    getModels,
};
