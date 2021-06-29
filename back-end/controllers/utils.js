const controller = {
    uploadPdf: async (req, res) => {
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: "No files"
                });
            } else {
                const { pdf } = req.files;

                pdf.mv("../front-end/public/uploads/" + pdf.name);
                const url = "../front-end/public/uploads/" + pdf.name;
                res.status(200).json({ url: url });
            }
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

module.exports = controller;