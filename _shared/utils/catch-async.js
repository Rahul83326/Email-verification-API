module.exports = (fn) => {
    return () => {
        fn().catch((err) => {
            console.log(err);
            return (err)
        });
    };
};
