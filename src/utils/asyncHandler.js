const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        Promise
            .resolve(
                await requestHandler(res, req, next)
            )
            .catch((err) => next(err))
    }
}

export { asyncHandler }