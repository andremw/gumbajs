module.exports = (requiredProperties, config) => {
    config = config || {};

    requiredProperties.forEach(property => {
        if (!config[property]) {
            throw new Error(`${property} is required!`);
        }
    });
};
