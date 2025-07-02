const bcrypt = require("bcrypt")

 const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

 const verifyPassword = async (
  candidatePassword,
  savedHashedPassword
) => {
  const isMatched = await bcrypt.compare(
    candidatePassword,
    savedHashedPassword
  );

  return isMatched;
};


module.exports ={
  hashPassword,
  verifyPassword
}