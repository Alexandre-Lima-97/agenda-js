const Contato = require("../models/contatoModel")
exports.index = (req, res) => {
        res.render('contato', {
                contato: {}
        });
};

exports.register = async (req, res) => {
        try{
        const contato = new Contato(req.body);
        await contato.register();

        if(contato.errors.length > 0){
                req.flash('errors', contato.errors);
                req.session.save(() => res.redirect('back'));
                return;
        }
        
        req.flash('success', 'Contato regsitrado com sucesso');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
        } catch(e){
                console.log(e);
                return res.render('erro404');
        }  
}

exports.editIndex = async function(req, res, next) {
        if(!req.params.id) return res.render('erro404');

        const contato = await Contato.buscaPorId(req.params.id);
        if(!contato) return res.render('erro404');

        res.render('contato', {
                contato
        })
}