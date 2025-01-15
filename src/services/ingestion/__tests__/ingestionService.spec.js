const { createIngestion, getIngestionById, addDataSource, listDataSources, retryIngestion } = require("../ingestion.service");
const mongoose = require("mongoose");
const Ingestion = require("../../../models/ingestionData.model");

jest.mock("../../../models/ingestionData.model");

describe("Ingestion Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("createIngestion", () => {
        it("should create a new ingestion and simulate ingestion process", async () => {
            const mockData = { name: "Test Ingestion" };
            const mockIngestion = { ...mockData, save: jest.fn(), status: "pending" };

            Ingestion.mockImplementation(() => mockIngestion);

            const result = await createIngestion(mockData);

            expect(Ingestion).toHaveBeenCalledWith(mockData);
            expect(mockIngestion.save).toHaveBeenCalled();
            expect(result).toEqual(mockIngestion);

            // Simulate the setTimeout
            jest.runAllTimers();

            expect(mockIngestion.status).toBe("pending");
            expect(mockIngestion.save).toHaveBeenCalledTimes(1);
        });
    });

    describe("getIngestionById", () => {
        it("should fetch ingestion by id", async () => {
            const mockId = new mongoose.Types.ObjectId();
            const mockIngestion = { id: mockId, name: "Test Ingestion" };

            Ingestion.findById.mockResolvedValue(mockIngestion);

            const result = await getIngestionById(mockId);

            expect(Ingestion.findById).toHaveBeenCalledWith(mockId);
            expect(result).toEqual(mockIngestion);
        });
    });

    describe("addDataSource", () => {
        it("should return the data source provided", async () => {
            const mockSource = { id: 1, name: "Test Source" };

            const result = await addDataSource(mockSource);

            expect(result).toEqual(mockSource);
        });
    });

    describe("listDataSources", () => {
        it("should return a list of predefined data sources", async () => {
            const result = await listDataSources();

            expect(result).toEqual([{ id: 1, name: "Example Source" }]);
        });
    });

    describe("retryIngestion", () => {
        it("should throw an error if no failed ingestion is found", async () => {
            const mockId = new mongoose.Types.ObjectId();

            Ingestion.findById.mockResolvedValue(null);

            await expect(retryIngestion(mockId)).rejects.toThrow("No failed ingestion found");

            expect(Ingestion.findById).toHaveBeenCalledWith(mockId);
        });
    });
});
