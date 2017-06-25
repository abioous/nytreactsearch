var Article = require('../models/Article.js');

/**
 * controller.js
 *
 * @description :: Server-side logic for managing nytreacts.
 */
module.exports = {

    /**
     * controller.list()
     */
    list: function (req, res) {
        Article.find(function (err, nytreacts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting nytreact.',
                    error: err
                });
            }
            return res.json(nytreacts);
        });
    },

    /**
     * controller.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        Article.findOne({_id: id}, function (err, nytreact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting nytreact.',
                    error: err
                });
            }
            if (!nytreact) {
                return res.status(404).json({
                    message: 'No such nytreact'
                });
            }
            return res.json(nytreact);
        });
    },

    /**
     * controller.create()
     */
    create: function (req, res) {
        var nytreact = new nytreactModel({
			Article : req.body.Article

        });

        Article.save(function (err, nytreact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating nytreact',
                    error: err
                });
            }
            return res.status(201).json(nytreact);
        });
    },

 

    /**
     * controller.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        Article.findByIdAndRemove(id, function (err, nytreact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the nytreact.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
