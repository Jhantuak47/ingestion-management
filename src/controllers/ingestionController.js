const ingestionService = require("../services/ingestion/ingestion.service")

exports.createIngestion = async (req, res) => {
    try {
        const ingestion = await ingestionService.createIngestion(req.body);
        res.status(201).json({ success: true, ingestion });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getIngestionStatus = async (req, res) => {
    try {
        const ingestion = await ingestionService.getIngestionById(req.params.id);
        if (!ingestion) {
            return res.status(404).json({ success: false, message: "Ingestion not found" });
        }
        res.status(200).json({ success: true, ingestion });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.addDataSource = async (req, res) => {
    try {
        const dataSource = await ingestionService.addDataSource(req.body);
        res.status(201).json({ success: true, dataSource });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.listDataSources = async (req, res) => {
    try {
        const dataSources = await ingestionService.listDataSources();
        res.status(200).json({ success: true, dataSources });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.retryIngestion = async (req, res) => {
    try {
        const result = await ingestionService.retryIngestion(req.params.id);
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
