const authSession = (req, res, next) => {

    const { user } = req.session
    if (!user) {

        res
            .status(401)
            .redirect('/api/login')
    }
    next()
}


module.exports = authSession