exports.get = (req, res) => {
  res.render('upload', { activePage: { upload: true }});
}
