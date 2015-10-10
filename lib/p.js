export default function p (fn) {
  return function (req, res, next) {
    fn(req, res, next).then(function (data) {
      console.log(data)
      if (!data) {
        res.status(404).json({})
      } else {
        res.json(data)
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(422).json(err)
      } else {
        next(err)
      }
    })
  }
}