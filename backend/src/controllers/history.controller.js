import { getUserHistory, getHistoryById} from "../services/history-db.service.js";

const getHistory = async (req, res) => {
    try {
        const userId = req.user.userId;

        const history = await getUserHistory(userId);

        res.status(200).json({
            history: history
        });

    } catch (error) {
        console.error("Fetching history error:", error);

        res.status(500).json({
            message: "Failed to fetch history",
            error: error.message
        });
    }
};

const getSingleHistory = async (req, res) => {
    try {
        const { historyId } = req.params;

        const userId = req.user.userId;

        const history = await getHistoryById( historyId, userId);

        if (!history) {
            return res.status(404).json({
                message: "History not found"
            });
        }

        res.status(200).json({
            history: history
        });

    } catch (error) {
        console.error("Fetching history error:", error);

        res.status(500).json({
            message: "Failed to fetch history",
            error: error.message
        });
    }
};

export {
    getHistory,
    getSingleHistory
};