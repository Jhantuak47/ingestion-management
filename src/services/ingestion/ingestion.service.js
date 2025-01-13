const Ingestion = require("../models/ingestionModel");

exports.createIngestion = async (data) => {
    const ingestion = new Ingestion(data);
    await ingestion.save();

    // Simulate ingestion process
    setTimeout(async () => {
        try {
            // Replace this with actual ingestion logic
            ingestion.status = "success";
            await ingestion.save();
        } catch (error) {
            ingestion.status = "failed";
            ingestion.error = error.message;
            await ingestion.save();
        }
    }, 2000);

    return ingestion;
};

exports.getIngestionById = async (id) => {
    return await Ingestion.findById(id);
};

exports.addDataSource = async (source) => {
    // This could involve storing the source in a database
    // For simplicity, we'll return the source
    return source;
};

exports.listDataSources = async () => {
    // Return a list of predefined sources
    return [{ id: 1, name: "Example Source" }];
};

exports.retryIngestion = async (id) => {
    const ingestion = await Ingestion.findById(id);
    if (!ingestion || ingestion.status !== "failed") {
        throw new Error("No failed ingestion found");
    }

    ingestion.status = "pending";
    ingestion.error = null;
    await ingestion.save();

    return await this.createIngestion(ingestion);
};
