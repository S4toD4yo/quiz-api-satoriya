const db = require("../Models");
const Quiz = db.quizzes;

//Menambah Data
exports.create = async (r, s) => {
  try {
    const data = await Quiz.create(r.body);
    s.json({
      message: "Quiz Berhasil Dibuat.",
      data: data,
    });
  } catch (error) {
    s.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

//Menampilkan Data
exports.getAll = async (r, s) => {
  try {
    const quizzes = await Quiz.findAll();
    s.json({
      message: "Quiz Berhasil Ditampilkan.",
      data: quizzes,
    });
  } catch (error) {
    s.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

//Mengubah Data
exports.update = async (r, s) => {
  const id = r.params.id;
  try {
    const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true });
    quiz.update(r.body, {
      where: { id },
    });
    s.json({
      message: "Quiz Berhasil Diubah.",
      data: quiz,
    });
  } catch (error) {
    s.status(500).json({
      message: error.message || "Gagal ᗜ˰ᗜ",
      data: null,
    });
  }
};

//Menghapus Data
exports.delete = async (r, s) => {
  const id = r.params.id;
  try {
    const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true });
    quiz.destroy();

    s.json({
      message: "Quiz Berhasil Dihapus.",
    });
  } catch (error) {
    s.status(500).json({
      message: error.message || "Gagal ᗜ˰ᗜ",
      data: null,
    });
  }
};

//Menampilkan Data Sesuai ID
exports.findOne = async (r, s) => {
  const id = r.params.id;
  try {
    const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true });
    s.json({
      message: "Quiz Berhasil Ditampilkan.",
      data: quiz,
    });
  } catch (error) {
    s.status(500).json({
      message: error.message || "Gagal ᗜ˰ᗜ",
      data: null,
    });
  }
};

//Menampilkan Quiz Dengan Kategori Tertentu
exports.getByCategoryId = async (r, s) => {
  const id = r.params.id;
  const quizzes = await Quiz.findAll({
    where: {
      categoryID: id,
    },
  });
  s.json({
    message: "Quiz Sesusai Dengan Kategori= " + id + "Berhasil Ditampilkan",
    data: quizzes,
  });
};

//Menampilkan Level Dengan Level Tertentu
exports.getByLevelId = async (r, s) => {
  const id = r.params.id;
  const quizzes = await Quiz.findAll({
    where: {
      levelID: id,
    },
  });
  s.json({
    message: "Quiz Sesusai Dengan Level= " + id + "Berhasil Ditampilkan",
    data: quizzes,
  });
};
