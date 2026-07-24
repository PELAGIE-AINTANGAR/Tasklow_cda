// const errorMiddleware = (err, req, res, next) => {
//   console.error(err);

//   res.status(500).json({
//     message: "Internal server error"
//   });
// };

// module.exports = errorMiddleware;

const errorMiddleware = (
  error,
  req,
  res,
  next
) => {

  console.error(error);


  const statusCode =
    error.statusCode || 500;


  const message =
    statusCode === 500
      ? "Internal server error"
      : error.message;


  return res
    .status(statusCode)
    .json({
      message
    });

};


module.exports = errorMiddleware;