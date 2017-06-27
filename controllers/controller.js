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
        Article.findOne({_id: id}, function (err, article) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting article.',
                    error: err
                });
            }
            if (!article) {
                return res.status(404).json({
                    message: 'No such article'
                });
            }
            return res.json(article);
        });
    },

    /**
     * controller.create()
     */
    create: function (req, res) {
        var data = {
            title : req.body.Title,
            link: req.body.Link,
            date: new Date(),
            comment:req.body.Comment
        };
        var article = new Article(data);
        article.save(function (err, nytreact) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Error when creating nytreact',
                    error: err
                });
            }
            return res.status(201).json(article);
        });
    },

 

    /**
     * controller.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        Article.findByIdAndRemove(id, function (err, article) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the article.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
