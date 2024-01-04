function errorMiddleware(err, req, res, next) {
    // Log the error (you can customize this part to suit your needs)
    console.error(err);

    // Check if the error has a status code, or set it to 500 (Internal Server Error) by default
    const statusCode = err.statusCode || 500;

    // Set the response status code and send an error message
    res.status(statusCode).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
}

// Export the error middleware function for use in your application
export default errorMiddleware;
