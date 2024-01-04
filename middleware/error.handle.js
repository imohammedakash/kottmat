const errorHandler = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const originalSend = res.send;
  res.send = function (data) {
      if (res.statusCode >= 500) { // Corrected "statuscode" to "statusCode"
          console.error("********** Error Log On middleware ********** ");
          console.error(" headers ==>", JSON.stringify(req.headers));
          console.error(" path ==>", req.path);
          console.error(" Authorization=> ", req.headers?.access_token);
          console.error("Query params ==>", req.query);
          console.error("Request Body ==>", req.body);
          console.error(" Error ==>", data);
          console.error("********** Error Log On middleware ********** ");
      }
      originalSend.call(this, data);
  };
  next();
};

export default errorHandler;
