exports.getSentences = (req, res, next) => {
    res.send(req.params.amount + ' sentences.');
};
