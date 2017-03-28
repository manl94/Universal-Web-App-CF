import * as express from 'express';
import {Logro} from './models/logro';

const router = express.Router();

router.route("/logros/:id")
	.put((req, res) => {
		
		let logroData = {};
		if(req.body.title) logroData["title"] = req.body.title;
		if(req.body.description) logroData["description"] = req.body.description;
		if(req.body.author) logroData["autor"] = req.body.author;

		Logro.findByIdAndUpdate(req.params.id, logroData,{new:true})
			.then(doc => res.json(doc));

	})
	.get((req, res) => {
		Logro.findById(req.params.id)
			.then(doc => res.json(doc));
	})
	.delete((req, res) => {
		Logro.findByIdAndRemove(req.params.id)
			.then(() => res.json({message: "Se elimino recurso con id: " + req.params.id}));
	});


router.route("/logros")
	.get((req, res) => {
		Logro.find({}).exec().then((documents) => res.json(documents));
	})
      .post((req, res) => {

        const logro = new Logro({
        	title: req.body.title,
        	description: req.body.description,
        	author: req.body.author
        });

        logro.save().then((doc) => res.json(doc));

      });

export const RouterApi = router;