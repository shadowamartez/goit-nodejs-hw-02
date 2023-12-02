const getCurrent = async (req, res) => {
    const { email } = req.user;

    res.json({
        email,
    })
}

export default getCurrent;