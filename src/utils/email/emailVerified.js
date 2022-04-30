const emailVerified = (link) => {
  const htmlContent = `
  <a href="${link}" style="color: white;" class="auth-button">verify your email</a>`;

  return htmlContent;
};

module.exports = emailVerified;
