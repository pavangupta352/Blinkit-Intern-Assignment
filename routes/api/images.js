const express = require("express");
const router = express.Router();
const multer = require("multer");
const passport = require("passport");

// Load Image model
const Image = require("../../models/Image");

// @route GET api/images/upload
// @desc Upload page
// @access Private
router.get(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.render("upload");
  }
);

// Set up multer for image uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// @route POST api/images/upload
// @desc Upload image
// @access Private
router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("imageData"),
  (req, res) => {
    const newImage = new Image({
      user: req.user.id,
      image: req.file.path,
    });

    newImage
      .save()
      .then((image) => res.json(image))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
