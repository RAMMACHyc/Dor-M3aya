export const uploadHandler = (req, res) => {
    if (req.file) {
        res.status(200).json({
            message: "File uploaded successfully",
            file: req.file,
        });

    }
    else {
        res.status(400).json({ error: "Please provide a file" });
    }
};

