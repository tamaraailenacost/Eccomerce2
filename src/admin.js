const isAdmin = (req, res, next) => {

    const { user } = req.session
    if (user.role !== 'Admin') {
        res
            .status(401)
            .json({
                error: -1,
                description: `ruta ${req.path} metodo ${req.method} not authorized`,
            })
    }
    next()
};


module.exports = { isAdmin };