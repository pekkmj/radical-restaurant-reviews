const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/really_good_reviews_development",
      test: "postgres://postgres:postgres@localhost:5432/really_good_reviews_test",
      e2e: "postgres://postgres:postgres@localhost:5432/really_good_reviews_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
